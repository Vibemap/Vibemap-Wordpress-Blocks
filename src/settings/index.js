import { render } from '@wordpress/element';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class PluginName extends Component {
    render() {
        return (
            <h1> General Settings </h1>
        );
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    render(
        <PluginName />,
        document.getElementById('plugin-name-settings-page')
    )
});