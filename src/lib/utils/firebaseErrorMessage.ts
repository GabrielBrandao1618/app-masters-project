const errorMessageByFirebaseCode = new Map<string, string>([
  ["auth/email-already-exists", "Email is already in use"],
  ["auth/wrong-password", "The password is wrong"],
  ["auth/user-not-found", "User not found"],
  ["auth/email-already-in-use", "Email is already in use"],
]);

export function getFirebaseErrorMessage(code: string) {
  return errorMessageByFirebaseCode.get(code) ?? `Unexpected error: ${code}`;
}
