// / <reference path="../../node_modules/@types/jquery/index.d.ts" />
import "font-awesome/css/font-awesome.min.css";
import "../public/css/index.scss";
import * as $ from "jquery";

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