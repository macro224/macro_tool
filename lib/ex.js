define(function () { 'use strict';

  /* 判断浏览器 */
  const has = browser => {
    const ua = navigator.userAgent;

    if (browser === 'ie') {
      const isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1;

      if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(ua);
        return parseFloat(RegExp['$1']);
      } else {
        return false;
      }
    } else {
      return ua.indexOf(browser) > -1;
    }
  };

  const newLine = '\r\n';

  const appendLine = (content, row, {
    separator,
    quoted
  }) => {
    const line = row.map(data => {
      if (!quoted) return data; // quote data

      data = typeof data === 'string' ? data.replace(/"/g, '"') : data;
      return `"${data}"`;
    });
    content.push(line.join(separator));
  };

  const defaults = {
    separator: ',',
    quoted: false
  };

  function csv(columns, datas, options, noHeader = false) {
    options = Object.assign({}, defaults, options);
    let columnOrder;
    const content = [];
    const column = [];

    if (columns) {
      columnOrder = columns.map(v => {
        if (typeof v === 'string') return v;

        if (!noHeader) {
          column.push(typeof v.title !== 'undefined' ? v.title : v.key);
        }

        return v.key;
      });
      if (column.length > 0) appendLine(content, column, options);
    } else {
      columnOrder = [];
      datas.forEach(v => {
        if (!Array.isArray(v)) {
          columnOrder = columnOrder.concat(Object.keys(v));
        }
      });

      if (columnOrder.length > 0) {
        columnOrder = columnOrder.filter((value, index, self) => self.indexOf(value) === index);
        if (!noHeader) appendLine(content, columnOrder, options);
      }
    }

    if (Array.isArray(datas)) {
      datas.forEach(row => {
        if (!Array.isArray(row)) {
          row = columnOrder.map(k => typeof row[k] !== 'undefined' ? row[k] : '');
        }

        appendLine(content, row, options);
      });
    }

    return content.join(newLine);
  }

  const getDownloadUrl = text => {
    const BOM = '\uFEFF';

    if (window.Blob && window.URL && window.URL.createObjectURL) {
      const csvData = new Blob([BOM + text], {
        type: 'text/csv'
      });
      return URL.createObjectURL(csvData);
    } else {
      return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text);
    }
  };

  const isIE11 = () => {
    let iev = 0;
    const ieold = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
    const trident = !!navigator.userAgent.match(/Trident\/7.0/);
    const rv = navigator.userAgent.indexOf('rv:11.0');

    if (ieold) {
      iev = Number(RegExp.$1);
    }

    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      iev = 10;
    }

    if (trident && rv !== -1) {
      iev = 11;
    }

    return iev === 11;
  };

  const isEdge = () => {
    return /Edge/.test(navigator.userAgent);
  };
  /* 下载文件 (传入导出文件名, 数据) */


  const download = (filename, data) => {
    if (has('ie') && has('ie') < 10) {
      const oWin = window.top.open('about:blank', '_blank');
      oWin.document.charset = 'utf-8';
      oWin.document.write(data);
      oWin.document.close();
      oWin.document.execCommand('SaveAs', filename);
      oWin.close();
    } else if (has('ie') === 10 || isIE11() || isEdge()) {
      const BOM = '\uFEFF';
      const csvData = new Blob([BOM + data], {
        type: 'text/csv'
      });
      navigator.msSaveBlob(csvData, filename);
    } else {
      const link = document.createElement('a');
      link.download = filename;
      link.href = getDownloadUrl(data);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportCsv = params => {
    if (params.filename) {
      if (params.filename.indexOf('.csv') === -1) {
        params.filename += '.csv';
      }
    } else {
      params.filename = 'table.csv';
    }

    let columns = [];
    let datas = [];

    if (params.columns && params.data) {
      columns = params.columns;
      datas = params.data;
    } else {
      return window.alert('请传入表头和数据');
    }

    let noHeader = false;
    if ('noHeader' in params) noHeader = params.noHeader;
    const data = csv(columns, datas, params, noHeader);
    if (params.callback) params.callback(data);else download(params.filename, data);
  };

  var ex = {
    csv: exportCsv
  };

  return ex;

});
