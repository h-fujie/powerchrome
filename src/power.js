import $ from "jquery";
import getCaretCoordinates from "textarea-caret";
import "./power.css"

"use strict";
$(() => {
    let $bomb = $("<span>")
        .addClass("bomb")
        .css({
            position: "absolute",
            display: "none"
        })
        .appendTo(document.body);
    let rumbleTimer = null;
    let showRumble = function(el) {
        clearTimeout(rumbleTimer);
        $(document.body).addClass("shake");
        rumbleTimer = setTimeout(hideRumble, 200);
    };
    let hideRumble = function() {
        $(document.body).removeClass("shake");
    };
    let explosionTimer = null;
    let showExplosion = function(el) {
        clearTimeout(explosionTimer);
        let pos = getCaretCoordinates(el, el.selectionEnd);
        let elPos = el.getBoundingClientRect();
        $bomb.css({
            top: `${(pos.top + elPos.top + window.scrollY) * 2 - 50}px`,
            left: `${(pos.left + elPos.left + window.scrollX) * 2}px`,
            display: "block"
        });
        explosionTimer = setTimeout(hideExplosion, 1000);
    };
    let hideExplosion = function() {
        $bomb.css("display", "none");
    };
    $("input[type='text']"
        + ", input[type='date']"
        + ", input[type='datetime-local']"
        + ", input[type='email']"
        + ", input[type='month']"
        + ", input[type='number']"
        + ", input[type='search']"
        + ", input[type='tel']"
        + ", input[type='time']"
        + ", input[type='url']"
        + ", input[type='week']"
        + ", textarea").on("keydown", function() {
        showRumble(this);
        showExplosion(this);
    });
});
