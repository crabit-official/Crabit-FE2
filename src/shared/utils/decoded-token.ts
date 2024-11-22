import jwt from 'jsonwebtoken';

interface IDecodedToken {
  exp: number;
}

/**
 * JWT 토큰이 만료되었는지 확인합니다.
 * @param token - 확인할 JWT 토큰입니다.
 * @returns 토큰이 만료되었으면 true, 그렇지 않으면 false를 반환합니다.
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as IDecodedToken | null;

    if (decoded) {
      // decoded 객체에서 exp(만료 시간)를 확인하여 만료 여부를 판단
      console.log(`Token expiration time (in seconds since epoch): ${decoded.exp}`);
      console.log(`Current time (in seconds since epoch): ${Math.floor(Date.now() / 1000)}`);
      console.log(`Is token expired? ${decoded.exp < Date.now() / 1000}`);
      return decoded.exp < Date.now() / 1000;
    }
    // 디코딩 실패 시에도 처리
    console.error('Failed to decode token.');
    return true; // 만료로 처리
  } catch (error) {
    // 토큰 디코딩 실패 시에도 처리
    console.error('Failed to decode token:', error);
    return true; // 만료로 처리
  }
};
