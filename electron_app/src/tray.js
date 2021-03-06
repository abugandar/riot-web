/*
Copyright 2017 Karl Glatz <karl@glatz.biz>
Copyright 2017 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const {app, Tray, Menu, nativeImage} = require('electron');

let trayIcon = null;

exports.hasTray = function hasTray() {
    return (trayIcon !== null);
};

exports.create = function(win, config) {
    // no trays on darwin
    if (process.platform === 'darwin' || trayIcon) return;

    const toggleWin = function() {
        if (win.isVisible() && !win.isMinimized()) {
            win.hide();
        } else {
            if (win.isMinimized()) win.restore();
            if (!win.isVisible()) win.show();
            win.focus();
        }
    };

    const contextMenu = Menu.buildFromTemplate([
        {
            label: `Show/Hide ${config.brand}`,
            click: toggleWin,
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: function() {
                app.quit();
            },
        },
    ]);

    trayIcon = new Tray(config.icon_path);
    trayIcon.setToolTip(config.brand);
    trayIcon.setContextMenu(contextMenu);
    trayIcon.on('click', toggleWin);

    let lastFavicon = null;
    win.webContents.on('page-favicon-updated', function(ev, favicons) {
        let newFavicon = config.icon_path;
        if (favicons && favicons.length > 0 && favicons[0].startsWith('data:')) {
            newFavicon = favicons[0];
        }

        // No need to change, shortcut
        if (newFavicon === lastFavicon) return;
        lastFavicon = newFavicon;

        // if its not default we have to construct into nativeImage
        if (newFavicon !== config.icon_path) {
            newFavicon = nativeImage.createFromDataURL(favicons[0]);
        }

        trayIcon.setImage(newFavicon);
        win.setIcon(newFavicon);
    });

    win.webContents.on('page-title-updated', function(ev, title) {
        trayIcon.setToolTip(title);
    });
};
