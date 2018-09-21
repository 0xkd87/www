/**
 * @author [kd]
 * @email [karna.dalal@gmail.com]
 * @create date 2018-09-03 04:05:53
 * @modify date 2018-09-03 04:05:53
 * @desc [common service class for building links to SERVER]
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {
  private  _server = {
    protocol: 'http',
    dns: 'emis000695',
    ip: '192.168.22.120',
    apiRoot: '_c/__api'
  };
constructor() { }

private get _pathToApi(): string {
  return this._server.protocol + '://' + this._server.dns + '/' + this._server.apiRoot + '/';
}

public url__UDT(op: string) {
  const _op = {
    'c': 'c/c.udt.php',
    'r': 'r/r.udt.list.php',
    'u': 'u/u.udt.php',
    'd': 'd/d.udt.php'
  };

  return (this._pathToApi + _op[op]);

}

public url__PRJ(op: string) {
  const _op = {
    'c': 'c/c.prj.php',
    'r': 'r/r.prj.list.php',
    'u': 'u/u.prjProp.php',
    'd': 'd/d.prj.php'
  };

  return (this._pathToApi + _op[op]);

}

} // class end
