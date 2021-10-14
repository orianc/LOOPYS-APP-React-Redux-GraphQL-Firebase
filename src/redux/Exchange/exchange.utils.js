import { firestore, auth } from '../../firebase/utils';
import firebase from 'firebase/app';

export const existingExchangeItem = ({
	prevExchangeItems,
	nextExchangeItem,
}) => {
	return prevExchangeItems.find(
		(exchangeItem) => exchangeItem.documentId === nextExchangeItem.documentId,
	);
};

export const updateDBItemState = async ({ state, itemId, userName }) => {
	const currentUser = await auth.currentUser;
	const doc = await firestore.collection('items').doc(itemId);

	if (state === 'asked') {
		await doc
			.update({
				askedBy: { uid: currentUser.uid, askerName: userName },
				state: 'asked',
			})
			.then(() => console.log('document updated !'))
			.catch((e) => console.error(e));
	}
	if (state === 'cancel') {
		await doc
			.update({
				state: 'open',
				askedBy: firebase.firestore.FieldValue.delete(),
			})
			.then(() => console.log('document updated !'))
			.catch((e) => console.error(e));
	}
	if (state === 'accepted') {
		await doc
			.update({
				state: 'accepted',
			})
			.then(() => console.log('Exchange state : accepted'))
			.catch((e) => console.error(e));
	}
	if (state === 'done') {
		await doc
			.update({
				state: 'done',
			})
			.then(() => console.log('exchange done.'))
			.catch((e) => console.error(e));
	}
};

export const handleAddToExchange = ({
	prevExchangeItems,
	nextExchangeItems,
}) => {
	const { nextExchangeItem, askerName } = nextExchangeItems;
	const { documentId } = nextExchangeItem;
	updateDBItemState({
		state: 'asked',
		userName: askerName,
		itemId: documentId,
	});
	const cartItemExist = existingExchangeItem({
		prevExchangeItems,
		nextExchangeItem,
	});

	if (cartItemExist) {
		return prevExchangeItems.map((exchangeItem) =>
			exchangeItem.documentId === documentId
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
			...nextExchangeItem,
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

export const checkExchangeDbResult = (currentUser) => {
	return new Promise((resolve, reject) => {
		const doc = firestore.collection('items').where('askedBy', '==', {
			uid: currentUser.id,
			askerName: currentUser.displayName,
		});

		doc
			.get()
			.then((snapshot) => {
				const data = [
					...snapshot.docs.map((doc) => {
						return {
							...doc.data(),
							documentId: doc.id,
						};
					}),
				];

				resolve(data);
			})
			.catch((e) => reject(e));
	});
};

export const getUserLoopysCount = (userId) => {
	return new Promise((resolve, reject) => {
		const userRef = firestore.collection('users').doc(userId);
		userRef
			.get()
			.then((snapshot) => {
				const data = snapshot.data();
				resolve(data);
			})
			.catch((e) => reject(e));
	});
};

export const loopysTransaction = async (loopysValue, askerId, authorId) => {
	const parsed = (number) => {
		return parseInt(number, 10);
	};

	const AuthorLoopysCount = await getUserLoopysCount(authorId);
	const AskerLoopysCount = await getUserLoopysCount(askerId);

	await firestore
		.collection('users')
		.doc(authorId)
		.update({
			loopys: parsed(AuthorLoopysCount.loopys) + parsed(loopysValue),
		})
		.then(() => console.log('Author Loopys upDate.'))
		.catch((e) => console.error(e));

	await firestore
		.collection('users')
		.doc(askerId)
		.update({
			loopys: parsed(AskerLoopysCount.loopys) - parsed(loopysValue),
		})
		.then(() => console.log('Asker Loopys upDate.'))
		.catch((e) => console.error(e));
};

export const handleClearExchangeHistory = (exchangeItems) => {
	console.log(exchangeItems);
	const data = [];
	exchangeItems.map((item) => item.state !== 'done' && data.push(item));
	console.log(data);

	return data;
};
