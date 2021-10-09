import { firestore, auth } from '../../firebase/utils';

export const existingExchangeItem = ({
	prevExchangeItems,
	nextExchangeItems,
}) => {
	return prevExchangeItems.find(
		(exchangeItem) => exchangeItem.documentID === nextExchangeItems.documentID,
	);
};

export const updateDBItemState = async ({ nextExchangeItems }) => {
	const currentUser = await auth.currentUser;
	const doc = await firestore
		.collection('items')
		.doc(nextExchangeItems.documentId);

	doc
		.update({
			state: 'asked',
			askedBy: { uid: currentUser.uid, userName: currentUser.displayName },
		})
		.then(() => console.log('document updated !'))
		.catch((e) => console.error(e));
};

export const handleAddToExchange = ({
	prevExchangeItems,
	nextExchangeItems,
}) => {
	updateDBItemState({ nextExchangeItems });
	const cartItemExist = existingExchangeItem({
		prevExchangeItems,
		nextExchangeItems,
	});

	if (cartItemExist) {
		return prevExchangeItems.map((item) =>
			item.documentID === nextExchangeItems.documentID
				? {
						...item,
						state: 'asked',
				  }
				: item,
		);
	}

	return [
		...prevExchangeItems,
		{
			...nextExchangeItems,
			state: 'asked',
		},
	];
};
