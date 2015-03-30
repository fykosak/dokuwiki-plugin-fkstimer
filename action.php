<?php

/**
 * DokuWiki Plugin fkstimer (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Michal Červeňák <miso@fykos.cz>
 */
if (!defined('DOKU_INC')) {
    die;
}

class action_plugin_fkstimer extends DokuWiki_Action_Plugin {

    /**
     * 
     * @param Doku_Event_Handler $controller
     */
    public function register(Doku_Event_Handler $controller) {


        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'add_server_time');
    }

    public function add_server_time(Doku_Event &$event, $param) {
        /*
         * corection to server time + user can set diferent betwen server and display time.
         */
        $date = date("Y-m-d\TH:i:s", time() + ( $this->getConf('server_corection')));
       
        $event->data['meta'][] = array(
            'name' => 'FKS_timer',
            'content' => $date
        );
        
    }

}
