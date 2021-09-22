let userId: number = 1; //Esse 1 represebta o id para teste.

export function saveUserId(id: number) {
  userId = id;
}

export function getUserId() {
  return userId;
}

export default { saveUserId, getUserId };
