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

export const handleAddImage = async (blob, docId) => {
	// console.log('in handleImage:', docRef);
	return new Promise((resolve, reject) => {
		storage
			.ref(`items/${docId}`)
			.put(blob)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleFetchItems = ({
	filterType,
	startAfterDoc,
	persistItems = [],
	askItemsToValid,
	pageSize = 3,
}) => {
	return new Promise((resolve, reject) => {
		const pageSizeOnSearch = 6;

		let ref = firestore.collection('items');

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

// export const handleFetchPhotos = (itemId) => {
// 	return new Promise((resolve, reject) => {
// 		storage
// 			.getDownloadURL(storage.ref(`items/${itemId}`))
// 			.then((url) => {
// 				resolve(url);
// 			})
// 			.catch((err) => reject(err));
// 	});
// };

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
