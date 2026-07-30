// FEL-36 will implement the real seedIfEmpty (check row count, call shared seed if empty).
// Stub exists so FEL-35's static import resolves without a runtime crash.
// TODO(FEL-36): replace with real impl + unit test (mock db).
export const seedIfEmpty = async (_db: unknown): Promise<void> => {
	// no-op until FEL-36
};
