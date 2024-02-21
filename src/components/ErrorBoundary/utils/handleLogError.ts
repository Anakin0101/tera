/**
 * Posts error information to a service - TBD
 * @param
 * @returns
 */
// TBD - temporary <any>
export const logError = async (err: any, componentStack: any) => {
  try {
    // log errors to a 3rd party service
    // e.g. logErrorToMyService(error, info.componentStack);
  } catch (error) {
    console.warn('logError: Could not log error: ', err, componentStack);
  }
};

/**
 * Posts error to backend service /microsites/t_pub/jserror
 * @param error Error
 * @returns error reference key
 */
// TBD - temporary <any>
export const handleLogError = async (error: any, stack: any) => {
  await logError(error, stack);
  return error;
};
