
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function disable(id) {
    const referencePoint = getElementByXpath('//a[@id="' + id + '"]');
    $(referencePoint).attr('aria-selected', false);
    $(referencePoint).attr('class', "list-group-item list-group-item-action");
}

$(document).ready(function () {

    $('.js-example-tags').select2({tags: true});

    $('#products a').click(function () {
        window.prodName = $(this).attr('id');

        $('#selectedProduct').text(window.prodName);

        if (window.refName) {
            $('#connect').prop('disabled', false)
        }

    });
    $('#referencepoints a').click(function () {
        const item = {
            "uid": $(this).attr('id')
        };
        if (window.refName) {
            window.refName.push(item)
        }
        else {
            window.refName = [item];
        }
        if (window.prodName) {
            $('#connect').prop('disabled', false)
        }
    });


    $('#connect').click(function () {
        console.log("Prod:" + window.prodName, "RP: " + window.refName);
        console.log("Clicked");
        disable(window.prodName);
        window.refName.forEach(item => disable(item.uid));
        // Send data to server
        const url = "/api/product/rp/attach";
        const data = {
            "ref_points": window.refName,
            "name": window.prodName
        };


        const request = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch(url, request)
            .then(res => res.json())
            .then(res => {
                const xpath = '//tr[@id="' + window.prodName + '"]/td[3]';
                const cell = getElementByXpath(xpath);
                let text = "";
                res.ref_names.forEach(item => text += item + " ");
                cell.innerText = text;
                delete window.prodName;
                delete window.refName;
                $(this).prop('disabled', true);

            })
            .catch(error => console.error("Error:", error));
    });


});