function _monitorAnimateDiffTab(tab_name) {
    let i = 0;
    const checkboxes = [];
    while (true) {
        elem_id = `#${tab_name}_controlnet_ControlNet-${i}_controlnet_enable_checkbox`;
        const checkbox_div = gradioApp().querySelector(elem_id);
        if (!checkbox_div) {
            break;
        }
        checkboxes.push(checkbox_div.getElementsByTagName("input")[0]);
        i += 1;
    }
    for (let checkbox of checkboxes) {
        checkbox.addEventListener(
            "change",
            monitorThisParam(
                `tab_${tab_name}`,
                `modules.${tab_name}.${tab_name}`,
                "controlnet_units",
                (extractor = (_) =>
                    checkboxes
                        .map((item) => item.checked)
                        .reduce((total, checked) => total + checked)),
            ),
        );
    }
}

function _monitorAnimateDiff() {
    for (let tab_name of ["txt2img", "img2img"]) {
        _monitorAnimateDiffTab(tab_name);
    }
}

onUiLoaded(_monitorAnimateDiff);
