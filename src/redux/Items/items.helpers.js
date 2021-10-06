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

export const handleFetchItems = ({ filterType }) => {
	return new Promise((resolve, reject) => {
		let ref = firestore.collection('items');

		if (filterType) {
			ref = ref.where('keyWords', 'array-contains', filterType);
		} else {
			ref = ref.orderBy('createAt');
		}
		ref
			.get()
			.then((snapshot) => {
				const itemsArray = snapshot.docs.map((doc) => {
					return {
						...doc.data(),
						documentId: doc.id,
					};
				});
				resolve(itemsArray);
			})
			.catch((err) => reject(err));
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
