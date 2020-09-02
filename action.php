<?php

use dokuwiki\Extension\ActionPlugin;
use dokuwiki\Extension\Event;
use dokuwiki\Extension\EventHandler;

/**
 * Class action_plugin_timer
 * @author Michal Červeňák <miso@fykos.cz>
 */
class action_plugin_timer extends ActionPlugin {

    public function register(EventHandler $controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'serverTime');
    }

    public function serverTime(Event $event) {
        /*
         * correction to server time + user can set different between server and display time.
         */
        $date = date('Y-m-d\TH:i:s', time() + ($this->getConf('server-correction')));

        $event->data['meta'][] = [
            'name' => 'timer',
            'content' => $date,
        ];
    }
}
