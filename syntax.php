<?php

/**
 * DokuWiki Plugin fkstimer (Syntax Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Michal Červeňák <miso@fykos.cz>
 */
if(!defined('DOKU_INC')){
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
        return array('formatting','substition','disabled');
    }

    public function getSort() {
        return 225;
    }

    public function connectTo($mode) {
        $this->Lexer->addSpecialPattern('{{fkstimer>.+?}}',$mode,'plugin_fkstimer');
    }

    /**
     * Handle the match
     */
    public function handle($match) {

        $matched = substr($match,11,-2);

        $params = helper_plugin_fkshelper::extractParamtext($matched);

        if(array_key_exists('date',$params)){
            
        }elseif(array_key_exists('series',$params)){
            /**
             * @TODO 
             */
        }else{
            foreach (array('hours','minute','second')as $value) {
                if(!array_key_exists($value,$params)){
                    $params[$value] = 0;
                }
            }
            $params['date'] = date('Y-m-d\TH:i:s',mktime($params['hours'],$params['minute'],$params['second'],$params['month'],$params['day'],$params['year']));
        }
        if(!array_key_exists('count',$params)){

            $params['count'] = 'down';
        }


        if(!isset($params['textbefore'])){
            $params['textbefore'] = $this->getConf('textbefore');
        }
        if(!isset($params['textafter'])){
            $params['textafter'] = $this->getConf('textafter');
        }

        return array(null,array($params));
    }

    public function render($mode,Doku_Renderer &$renderer,$data) {
        // $data is what the function handle return'ed.
        if($mode == 'xhtml'){
            /** @var Do ku_Renderer_xhtml $renderer */
            list(,list($params)) = $data;


            $renderer->doc .= '<div class="FKS_timer_deadline" data-count="'.$params['count'].'" data-date="'.$params['date'].'">';
            if(isset($params['textbefore'])){
                $renderer->doc .= '<span class="text-before">'.p_render('xhtml',p_get_instructions($params['textbefore']),$info).'</span>';
            }

            if(isset($params['textafter'])){
                $renderer->doc .= '<span class="text-after">'.p_render('xhtml',p_get_instructions($params['textafter']),$info).'</span>';
            }
            $renderer->doc.= '<span class="timer"></span>';


            $renderer->doc .= "</div>";
        }
        return false;
    }

}
