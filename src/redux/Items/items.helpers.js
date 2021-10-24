import { firestore, storage } from '../../firebase/utils';
import 'firebase/storage';

export const handleAddItem = (item) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('items')
			.doc()
			.set(item)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleAddImage = async (photo, docId) => {
	// console.log('in handleImage:', docRef);
	const ref = await storage.ref('items').child(photo.name);

	await ref.put(photo).then(() => {
		console.log('file uploaded');
	});
	const photoUrl = await ref.getDownloadURL();

	console.log('file url', photoUrl);
	return photoUrl;
};

export const handleFetchItems = ({
	filterType,
	startAfterDoc,
	persistItems = [],
	askItemsToValid,
	pageSize = 3,
	notDone = false,
}) => {
	return new Promise((resolve, reject) => {
		const pageSizeOnSearch = 6;

		let ref = firestore.collection('items');
		if (notDone) {
			ref = ref.where('state', '!=', 'done').orderBy('state');
		}
		if (filterType) {
			ref = ref
				.where('keyWords', 'array-contains', filterType)
				.limit(pageSizeOnSearch);
		}

		if (pageSize != null) {
			ref = ref.orderBy('createAt').limit(pageSize);
		} else {
			ref = ref.orderBy('createAt');
		}

		if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

		if (askItemsToValid)
			ref
				.where('verified', '==', false)
				.get()
				.then((snapshot) => {
					const totalCount = snapshot.size;

					const data = [
						...persistItems,
						...snapshot.docs.map((doc) => {
							return {
								...doc.data(),
								documentId: doc.id,
							};
						}),
					];

					resolve({
						data,
						queryDoc: snapshot.docs[totalCount - 1],
						isLastToValid: totalCount < 1,
					});
				})
				.catch((e) => reject(e));
		else {
			ref
				.where('verified', '==', true)
				.get()
				.then((snapshot) => {
					const totalCount = snapshot.size;

					const data = [
						...persistItems,
						...snapshot.docs.map((doc) => {
							return {
								...doc.data(),
								documentId: doc.id,
							};
						}),
					];

					resolve({
						data,
						queryDoc: snapshot.docs[totalCount - 1],
						isLastPage: totalCount < 1,
					});
				})
				.catch((err) => reject(err));
		}
	});
};

export const handleDeleteItem = (itemId) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('items')
			.doc(itemId)
			.delete()
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};

export const handleValidItem = (documentId) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('items')
			.doc(documentId)
			.update({ verified: true })
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};

export const handleFetchItem = (itemId) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('items')
			.doc(itemId)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					const data = snapshot.data();
					resolve(data);
				}
			})
			.catch((e) => reject(e));
	});
};
