/**
 * @function readCookie
 * @description Function to read any cookie value by its name
 */
export const readCookie = (cname) => {
  const cookieName = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookieItem = cookieArray[i].trim();
    if (cookieItem.indexOf(cookieName) == 0) {
      const cookieValue = cookieItem.substring(
        cookieName.length,
        cookieItem.length
      );
      return cookieValue;
    }
  }
};

/**
 * @function setCookie
 * @description Function to store any cookie with expiry equal to token expiry
 */
export const setCookie = (cname, cvalue) => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
  document.cookie = `${cname}=${encodeURIComponent(
    cvalue
  )};expires=${d.toUTCString()};path=/;`;
};

/**
 * @function deleteCookie
 * @description Function to delete any cookie by its name
 */
export const deleteCookie = (cname) => {
  const d = new Date();
  d.setTime(d.getTime() - 12 * 60 * 60 * 1000);
  document.cookie = `${cname}=;expires=${d.toUTCString()};path=/;`;
};
