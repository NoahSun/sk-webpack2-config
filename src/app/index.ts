// 在tsconfig.json中include了@types的声明文件后可不需要下面两种方式的引用
// /// <reference path="../../node_modules/@types/jquery/index.d.ts" />
// import * as $ from "jquery";

import "font-awesome/css/font-awesome.min.css";
import "../public/css/index.scss";

class Person {
    constructor(public name: string) {

    }
    say() {
        console.log(this.name);
    }
}
$(() => {
    $("span").css('color', 'yellow');
    const person = new Person('Noah Sun');
    person.say();
});