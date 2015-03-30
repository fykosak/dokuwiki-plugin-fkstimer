<?php

/**
 * DokuWiki Plugin fkstimer (Syntax Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Michal Červeňák <miso@fykos.cz>
 */
if (!defined('DOKU_INC')) {
    die();
}

class syntax_plugin_fkstimer extends DokuWiki_Syntax_Plugin {

    public function getType() {
        return 'substition';
    }

    public function getPType() {
        return 'normal';
    }

    public function getAllowedTypes() {
        return array('formatting', 'substition', 'disabled');
    }

    public function getSort() {
        return 225;
    }

    public function connectTo($mode) {
        $this->Lexer->addSpecialPattern('{{fkstimer>.+?}}', $mode, 'plugin_fkstimer');
    }

    /**
     * Handle the match
     */
    public function handle($match, $state, $pos, Doku_Handler &$handler) {
        $match = substr($match, 11, -2);

        $params = helper_plugin_fkshelper::extractParamtext($match);
        if (array_key_exists('date', $params)) {
            
        } elseif (array_key_exists('series', $params)) {
            /**
             * @TODO 
             */
        } else {
            foreach (array('hours', 'minute', 'second')as $value) {
                if (!array_key_exists($value, $params)) {
                    $params[$value] = 0;
                }
            }

            $params['date'] = date("Y-m-d\TH:i:s", mktime($params['hours'], $params['minute'], $params['second'], $params['month'], $params['day'], $params['year']));
        }



        return array($state, array($params));
    }

    public function render($mode, Doku_Renderer &$renderer, $data) {
        // $data is what the function handle return'ed.
        if ($mode == 'xhtml') {
            /** @var Do ku_Renderer_xhtml $renderer */
            list($state, $match) = $data;


            //$curent = date("Y-m-d-H:i:s");
            list($params) = $match;

            $renderer->doc .= $script;
            $renderer->doc .= '<span class="FKS_timer_deadline" data-date="' . $params['date'] . '">';

            $renderer->doc .= "</span>";
        }
        return false;
    }

}
