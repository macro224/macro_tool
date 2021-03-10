(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.macro_tool = factory());
}(this, (function () { 'use strict';

  var toString = Object.prototype.toString;

  const config = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Symbol]': 'symbol',
    '[object Date]': 'date',
    '[object Json]': 'json',
    '[object Set]': 'set',
    '[object Map]': 'map'
  };
  /**
   * 根据传入的数据判断数据类型
   * @param {*} value 传入的数据
   * @returns {String} 返回该数据的类型
   */

  function get(value) {
    const key = toString.call(value);
    const type = config[key];

    if (type === undefined) {
      throw new Error(`暂不支持判断 ${key} 类型，请联系开发维护人员进行添加`);
    }

    return type;
  }

  /**
   * 根据传入的数据判断数据是否为数组类型
   * @param {*} value 传入的数据
   * @returns {Boolean} 返回是否为数组 true || false
   */
  const isArray = function (value) {
    return Array.isArray(value);
  };

  const objectProto = Object.prototype;
  /**
   * 检查参数是否是原型。
   * @param {*} value 要检查的值
   * @returns {boolean} 如果是原型返回真，不是返回假
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  function isPrototype(value) {
    const Ctor = value && value.constructor;
    const proto = typeof Ctor === 'function' && Ctor.prototype || objectProto;
    return value === proto;
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * 检查 value 是否是为空。
   * @param {*} value 传入的值
   * @param {*} space 是否判断空格
   * @returns {boolean} 如果value是空返回true，否则返回false。
   */

  function isEmpty(value, space) {
    if (value === null) {
      return true;
    }

    if (value === undefined) {
      return true;
    }

    if (isArray(value) || typeof value === 'string' || typeof value.splice === 'function') {
      return space ? !value.trim().length : !value.length;
    }

    const tag = get(value);

    if (tag === 'map' || tag === 'set') {
      return !value.size;
    }

    if (tag === 'number') {
      return value <= 0;
    }

    if (isPrototype(value)) {
      return !Object.keys(value).length;
    }

    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  const modeles$3 = {
    get,
    isArray,
    isEmpty,
    isPrototype
  };

  function deepAssignObject(obj) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    const newObj = new obj.constructor(); // 保持继承链

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 不遍历其原型链上的属性
        const val = obj[key];
        newObj[key] = typeof val === 'object' ? deepAssignObject(val) : val; // 使用递归处理嵌套
      }
    }

    return newObj;
  }

  function deepAssignArray(arr) {
    const newArr = [];

    for (let i = 0; i < arr.length; ++i) {
      const type = get(arr[i]);
      newArr[i] = type === 'object' || type === 'date' ? deepAssignObject(arr[i]) : arr[i];
    }

    return newArr;
  }
  /**
   * 根据传入的数据判断数据类型
   * @param {*} obj 传入的数据
   * @returns {*} 如果传入的是 对象||数组 则返回copy后数据,否则返回字符串提示
   */


  const deepAssign = function (...obj) {
    // 参数数量为1
    if (obj.length === 0) {
      throw new Error('请输入深拷贝参数');
    }

    if (obj.length > 1) {
      throw Error('只处理单参情况，不支持多参');
    } // 除数组和对象外，提示错误信息


    let result = Object.create(null);

    switch (get(obj[0])) {
      case 'array':
        result = deepAssignArray(obj[0]);
        break;

      case 'object':
        result = deepAssignObject(obj[0]);
        break;

      default:
        throw Error('只处理数组和对象，不支持其他类型');
    }

    return result;
  };

  const modeles$2 = {
    deepAssign
  };

  function formatTime(date, obj, division = '/') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return obj ? {
      year,
      month,
      day,
      hour,
      minute,
      second
    } : [year, month, day].map(formatNumber).join(division) + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }

  function formatNumber(n) {
    return n < 10 ? '0' + n : n;
  }

  /**
   * 根据传入的链接(string)获取链接后面的参数
   * @param {*} url 传入的链接
   * @returns {Object} 返回参数对象
   */
  function formatUrlParams(url) {
    if (typeof url !== 'string') {
      return {};
    }

    let search = url.split('?')[1];
    const params = {};

    if (search) {
      search = search.replace(/#.+$/, '');

      if (search.length > 1) {
        const querys = search.split('&');
        const len = querys.length;
        let i = 0;

        while (i < len) {
          const query = querys[i].split('=');
          const key = query[0].replace(/\[\]$/, '');
          const val = decodeURIComponent(query[1]);
          params[key] = val;
          i++;
        }
      }
    }

    return params;
  }

  const modeles$1 = {
    time: formatTime,
    urlParams: formatUrlParams
  };

  // 手机号码验证
  function mobile(value) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(value);
  } // 邮箱验证


  function email(value) {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return reg.test(value);
  } // qq验证


  function qq(value) {
    let reg = /^[1-9][0-9]{4,11}$/;
    return reg.test(value);
  } // 昵称不能包含特殊字符验证


  function nickname(value) {
    let reg = /[\'.,:;*?~`!@#$%^&+=)(<>{}]|\]|\[|\/|\\\|\"|\|/;
    return !reg.test(value);
  } // 验证密码


  function password(value) {
    let reg = /^[A-Za-z0-9]{6,20}$/;
    return reg.test(value);
  } // 纯数字验证


  function int(value) {
    let reg = /^\d+$/;
    return reg.test(value);
  }

  var validator = {
    mobile,
    email,
    qq,
    nickname,
    password,
    int
  };

  const modeles = {
    type: modeles$3,
    data: modeles$2,
    format: modeles$1,
    validator
  };

  return modeles;

})));
