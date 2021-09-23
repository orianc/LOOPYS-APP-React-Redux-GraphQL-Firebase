import { firestore, storage } from '../../firebase/utils';

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
