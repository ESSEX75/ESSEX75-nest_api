/** Интерфейс ответа при аутентификации. */
export interface AuthResponseDto {
  /** JWT-токен доступа, используемый для авторизации в системе. */
  accessToken: string;
  /** Refresh-токен, используемый для обновления access-токена. */
  refreshToken: string;
  /** Дата и время истечения access-токена в формате ISO. */
  expiresAt: Date;
}
