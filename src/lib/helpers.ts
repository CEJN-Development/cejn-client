import sha256 from 'crypto-js/sha256.js';

export const audBuilder = (bd) => {
  const version = parseInt(bd.browser.version);
  const str = `${bd.os.name}||${bd.os.version}||||${bd.browser.name}||${version}`;

  return sha256(str).toString();
}

/*
 * 
 * Get browser information
 * https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
 * Based on update by David Parker
 * https://github.com/davidwparker/programmingtil-svelte/blob/83883b2190834445d5bc19e3b5a0cc7f2c639080/src/shared/helpers.js#L15
 * Usage: const bd = browserDetector(navigator, window).init();
 * 
 */

export function browserDetector(navigator:Navigator, window:any) {
  const module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataOS: [
      { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
      { name: 'Windows', value: 'Win', version: 'NT' },
      { name: 'iPhone', value: 'iPhone', version: 'OS' },
      { name: 'iPad', value: 'iPad', version: 'OS' },
      { name: 'Kindle', value: 'Silk', version: 'Silk' },
      { name: 'Android', value: 'Android', version: 'Android' },
      { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
      { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
      { name: 'Macintosh', value: 'Mac', version: 'OS X' },
      { name: 'Linux', value: 'Linux', version: 'rv' },
      { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    ],
    dataBrowser: [
      { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
      { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
      { name: 'Safari', value: 'Safari', version: 'Version' },
      { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
      { name: 'Opera', value: 'Opera', version: 'Opera' },
      { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
      { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
    ],
    init: function () {
      let agent = this.header.join('');
      let os = this.matchItem(agent, this.dataOS);
      let browser = this.matchItem(agent, this.dataBrowser);
      return { os, browser };
    },
    matchItem: (string:string, data:any[]) => {
      var i = 0,
          j = 0,
          regex:RegExp,
          regexv:RegExp,
          match:boolean,
          matches,
          version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
          matches = string.match(regexv);
          version = '';
          if (matches) { if (matches[1]) matches = matches[1] };
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              j === 0 ? version += matches[j] + '.' : version += matches[j];
            };
          } else {
            version = '0';
          };
          return { name: data[i].name, version: parseFloat(version) };
        };
      };
      return { name: 'unknown', version: 0 };
    },
  };
  return module;
};