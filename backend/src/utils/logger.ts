export const logAction = (action: string, user?: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${action} ${user ? `par ${user}` : ''}`);
};
