import { Directive, OnInit } from "@angular/core";
import { BaseBladeDirective } from "./base-blade.directive";

@Directive()
export abstract class BaseListBladeDirective<T> extends BaseBladeDirective 
implements OnInit{

}