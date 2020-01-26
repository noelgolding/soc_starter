import { XElement, html, css } from './x-element.js'

export default class ToggleButton extends XElement {
  static get properties() {
    return {
      name: { type: String, reflect: true },
      checked_label: { type: String, reflect: true, attribute: 'alt-text-checked' },
      unchecked_label: { type: String, reflect: true, attribute: 'alt-text-unchecked' },
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      showStatus: { type: Boolean, reflect: true },
      os: { type: String, reflect: true }
    }
  }

  constructor() {
    super()
    this.checked_label = 'on'
    this.unchecked_label = 'off'
    this.os = 'default'
  }

  static get styles() {
    return
  }

  render() {
    let css = getStylesForOs(this.os)
    return html `
    ${css}
    <div>
      <label class="tb_label" for="tb_checkbox"><slot></slot></label>
      <input type="checkbox"
        id="tb_checkbox"
        class="mobileToggle"
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${() => this._fire('toggle')}
      >
      <label class="tb_button" for="tb_checkbox"></label>
      <label class="tb_status">${(this.showStatus) ? ((this.checked) ? this.checked_label : this.unchecked_label) : ''}</label>
    </div>
    `
  }

  _fire(eventType) {
    if (eventType === 'toggle') {
      this.checked = !this.checked
    }
    this.dispatchEvent(new CustomEvent(eventType, { detail: (this.checked) ? 'on' : 'off' }))
  }
}

ToggleButton.register()

function getStylesForOs(os) {
  /* https://deviceatlas.com/blog/list-of-user-agent-strings */
  os = os.toLowerCase()
  if (os === 'default') {
    let ua = navigator.userAgent.toLowerCase()
    if (/\sip(hone|p[ao]d)\s/.test(ua)) {
      os = 'ios'
    } else if (/\sandroid\s/.test(ua)) {
      os = 'android'
    } else if (/\swindows phone\s/.test(ua)) {
      os = 'windows_mobile'
    } else if (/\swindows\s/.test(ua)) {
      os = 'windows_desktop'
    } else if (/\slinux\s/.test(ua)) {
      os = 'linux'
    } else if (/\smacintosh\s/.test(ua)) {
      os = 'mac_os'
    } else if (/\scros\s/.test(ua)) {
      os = 'chrome_os'
    }
  }
  switch (os) {
    case 'ios':
      return ios_css
      break
    case 'android':
      return android_css
      break
    default:
      return default_css
  }
}

const default_css = html `
<style>
  div {
    display: inline-block;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .tb_button {
    position: relative;
    display: inline-block;
    margin-right: .5rem;
    width: 46px;
    height: 26px;
    background-color: #e6e6e6;
    border-radius: 23px;
    vertical-align: text-bottom;
    transition: all 0.3s linear;
  }

  .tb_button::before {
    content: "";
    position: absolute;
    left: 0;
    width: 42px;
    height: 22px;
    background-color: #e6e6e6;
    border-radius: 11px;
    transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
    transition: all 0.25s linear;
  }

  .tb_button::after {
    content: "";
    position: absolute;
    left: 0;
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 11px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
    transform: translate3d(2px, 2px, 0);
    transition: all 0.2s ease-in-out;
  }
  
  div:active .tb_button::after {
    width: 28px;
    transform: translate3d(2px, 2px, 0);
  }

  div:active input:checked ~ .tb_button::after { transform: translate3d(16px, 2px, 0); }

  input { display: none; }

  input:checked ~ .tb_button { 
    /* toggle button background - on */
    background-color: #4BD763; 
  }

  input:checked ~ .tb_button::before { 
    /* toggle button background - off */
    transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); 
  }

  input:checked ~ .tb_button::after { 
    /* toggle button */
    transform: translate3d(22px, 2px, 0); 
  }
  
  input:disabled ~ .tb_button  {
    /* toggle button background - on */
    background-color: #aaa;
  }
  
  input:disabled ~ .tb_button::before  {
    /* toggle button background - off */
    background-color: #aaa;
  }
  
  input:disabled ~ .tb_button::after  {
    /* toggle button */
    background-color: #555;
  }
</style>
`

const ios_css = html `
<style>
  .inactiveMixin {
    content: "";
    position: absolute;
    display: block;
  }
  .beforeAnimation {
    -moz-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    -o-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    -webkit-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
  }
  .afterAnimation {
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 0px 0 hsla(0, 0%, 0%, 0.04), 0 4px 9px hsla(0, 0%, 0%, 0.13), 0 3px 3px hsla(0, 0%, 0%, 0.05);
    -moz-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    -o-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    -webkit-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
  }

  div input.mobileToggle {
    opacity: 0;
    position: absolute;
  }
  div input.mobileToggle + label {
    position: relative;
    display: inline-block;
    user-select: none;
    -moz-transition: 0.4s ease;
    -o-transition: 0.4s ease;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
    -webkit-tap-highlight-color: transparent;
    height: 30px;
    width: 50px;
    border: 1px solid #e4e4e4;
    border-radius: 60px;
  }
  div input.mobileToggle + label:before {
    content: "";
    position: absolute;
    display: block;
    -moz-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    -o-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    -webkit-transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    height: 30px;
    width: 51px;
    top: 0;
    left: 0;
    border-radius: 30px;
  }
  div input.mobileToggle + label:after {
    content: "";
    position: absolute;
    display: block;
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 0px 0 hsla(0, 0%, 0%, 0.04), 0 4px 9px hsla(0, 0%, 0%, 0.13), 0 3px 3px hsla(0, 0%, 0%, 0.05);
    -moz-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    -o-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    -webkit-transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    background: whitesmoke;
    height: 28px;
    width: 28px;
    top: 1px;
    left: 0px;
    border-radius: 60px;
  }
  div input.mobileToggle:checked + label:before {
    background: #2ecc71;
    -moz-transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
    -o-transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
    -webkit-transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
    transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
  }
  div input.mobileToggle:checked + label:after {
    left: 24px;
  }

  div {
    /* display:grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: auto
    grid-template-rows: auto;
    grid-template-areas:
      "button"; */
  }

  .tb_label {
    grid-area: label;
  }
  .tb_button {
    grid-area: button;
  }
  .tb_status {
    grid-area: status;
  }
</style>`

const android_css = html `
<style>
  /* =================== Android ==================== */
  .tb_button {
    position: relative;
    display: block;
    height: 20px;
    width: 44px;
    background: #898989;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tb_button:after {
    position: absolute;
    left: -2px;
    top: -3px;
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0,0,0,0.05);
    content: '';
    transition: all 0.3s ease;
  }

  .tb_button:active:after { transform: scale(1.15, 0.85); }

  .mobileToggle:checked + label { background: #6fbeb5; }

  .mobileToggle:checked + label:after {
    left: 20px;
    background: #179588;
  }

  .mobileToggle:disabled + label {
    background: #d5d5d5;
    pointer-events: none;
  }

  .mobileToggle:disabled + label:after { background: #bcbdbc; }

  .mobileToggle { display: none; }
</style>`