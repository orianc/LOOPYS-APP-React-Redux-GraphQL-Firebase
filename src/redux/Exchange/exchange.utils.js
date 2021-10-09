import { firestore, auth } from '../../firebase/utils';
import firebase from 'firebase/app';

export const existingExchangeItem = ({
	prevExchangeItems,
	nextExchangeItems,
}) => {
	return prevExchangeItems.find(
		(exchangeItem) => exchangeItem.documentId === nextExchangeItems.documentId,
	);
};

export const updateDBItemState = async ({ state, itemId }) => {
	const currentUser = await auth.currentUser;
	const doc = await firestore.collection('items').doc(itemId);
	console.log('utils message', state, itemId);

	if (state === 'asked') {
		doc
			.update({
				state: 'asked',
				askedBy: { uid: currentUser.uid, userName: currentUser.displayName },
			})
			.then(() => console.log('document updated !'))
			.catch((e) => console.error(e));
	}
	if (state === 'cancel') {
		doc
			.update({
				state: 'open',
				askedBy: firebase.firestore.FieldValue.delete(),
			})
			.then(() => console.log('document updated !'))
			.catch((e) => console.error(e));
	}
};

export const handleAddToExchange = ({
	prevExchangeItems,
	nextExchangeItems,
}) => {
	updateDBItemState({ state: 'asked', itemId: nextExchangeItems.documentId });
	const cartItemExist = existingExchangeItem({
		prevExchangeItems,
		nextExchangeItems,
	});

	if (cartItemExist) {
		return prevExchangeItems.map((exchangeItem) =>
			exchangeItem.documentId === nextExchangeItems.documentId
				? {
						...exchangeItem,
						state: 'asked',
				  }
				: exchangeItem,
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

export const handleRemoveExchangeItem = ({
	prevExchangeItems,
	exchangeItemToRemove,
}) => {
	updateDBItemState({ state: 'cancel', itemId: exchangeItemToRemove });

	return prevExchangeItems.filter(
		(item) => item.documentId !== exchangeItemToRemove,
	);
};
