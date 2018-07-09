/**
 * Class Auth use for Authentication from
 * Web Service / Rest Api / Micro-Service
 * Login method for request login to server
 * on request has 200 status, Token save
 * to Session Storage in the browser
 * Token in the browser its used for Check Authentication
 * and Protected Component of Web Apps
 *
 * Author : ri7nz
 * Email  : ri7nz.labs@gmail.com
 *
 * @property {string} token
 * @property {bool} isAuthenticated
 */
export default class Auth {
  /**
   * @var {string} authKey its key name for
   * session storage
   */
  static authKey = 'authToken'

  /**
   * Remove token on client side
   */
  static destroy() {
    sessionStorage.removeItem(this.authKey)
  }

  /**
   * @return {string} token from session storage
   */
  static get token() {
    return sessionStorage.getItem(this.authKey)
  }

  /**
   * set urllogin
   * @param {string} url
   */
  static set urlLogin(url) {
    this.urlLogin = url
  }

  /**
   * @return {string} csrf token from session storage
   * csrf token in session storage its get from
   * Response Headers X-CSRF-TOKEN
   */
  static csrf() {
    return sessionStorage.getItem('csrf_token')
  }

  /**
   * @return {bool} if token exists
   */
  static get isAuthenticated() {
    return Boolean(true && this.token)
  }

  /**
   * action for login
   * @param {object} payload
   * @return {bool}
   */
  static async login(payload) {
    /**
     * if token exists on session storage
     * browser return this.token
     */
    if ( this.token ) {
      return this.token
    }

    const result = await this.request(
      'auth',
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )
    if ('data' in result) {
      /**
       * Save Token on session storage
       */
      sessionStorage.setItem(
        this.authKey,
        result.access_token
      )
      /**
       * Set lifetime token by timeout
       * 7 days token lifetime on browser
       */
      setTimeout(()=>{
        this.destroy()
      }, 1000*60*60*24*7)
    } else if (result.status_code === 401) {
      return {'error': 'Alamat email dan Kata sandi tidak valid.'}
    }
    return result
  }
}
