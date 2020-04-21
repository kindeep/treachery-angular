import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { uuidv4 } from 'uuid/v4';

export const getPlainObject = (obj) => {
  return Object.assign({}, obj);
};

export const randomUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const randomReadableId = (length = 4) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function getObservableInstance<E>(observable: Observable<E>): Promise<E> {
  return observable.pipe(first()).toPromise();
}