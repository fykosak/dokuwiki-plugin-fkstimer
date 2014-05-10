<?php

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
        $this->Lexer->addSpecialPattern('<fkstimer>.+?</fkstimer>', $mode, 'plugin_fkstimer');
    }

    //public function postConnect() { $this->Lexer->addExitPattern('</fkstimer>','plugin_fkstimer'); }

    /**
     * Handle the match
     */
    public function handle($match, $state, $pos, Doku_Handler &$handler) {
        $match = substr($match, 10, 19);
        $postdadline = $match;
        //if ($color = $this->_isValid($color)) $color = "color:$color;";
        //if ($background = $this->_isValid($background)) $background = "background-color:$background;";
        return array($state, array($postdadline));
    }

    /* function loaddeadline($file){
      if (file_exists($file)){
      $opfile = fopen($file,"r");
      $DeadlineData = fread($opfile,10000);
      fclose($opfile);
      str_replace("\n",'',$DeadlineData);
      }
      return $DeadlineData;
      } */

    public function render($mode, Doku_Renderer &$renderer, $data) {
        // $data is what the function handle return'ed.
        if ($mode == 'xhtml') {
            /** @var Do ku_Renderer_xhtml $renderer */
            list($state, $match) = $data;
            $infoD = getdate();
            if ($infoD['mon']<10){
                $infoD['mon']="0".$infoD['mon'];
            }
            if ($infoD['mday']<10){
                $infoD['mday']="0".$infoD['mday'];
            }
             if ($infoD['hours']<10){
                $infoD['hours']="0".$infoD['hours'];
            }
             if ($infoD['minutes']<10){
                $infoD['minutes']="0".$infoD['minutes'];
            }
             if ($infoD['seconds']<10){
                $infoD['seconds']="0".$infoD['seconds'];
            }
            $dateD= $infoD['year'].'-'.$infoD['mon'].'-'.$infoD['mday']."T".$infoD['hours'].':'.$infoD['minutes'].':'.$infoD['seconds'];
            list($postdadline) = $match;
           $script .= '<script type="text/javascript" charset="utf-8">';
            $script .= 'var secSgN ="' . $this->getLang('secSgN') . '";';
            $script .= 'var secPlN ="' . $this->getLang('secPlN') . '";';
            $script .= 'var secPlG ="' . $this->getLang('secPlG') . '";';

            $script .= 'var minSgN ="' . $this->getLang('minSgN') . '";';
            $script .= 'var minPlN ="' . $this->getLang('minPlN') . '";';
            $script .= 'var minPlG ="' . $this->getLang('minPlG') . '";';

            $script .= 'var hourSgN ="' . $this->getLang('hourSgN') . '";';
            $script .= 'var hourPlN ="' . $this->getLang('hourPlN') . '";';
            $script .= 'var hourPlG ="' . $this->getLang('hourPlG') . '";';

            $script .= 'var daySgN ="' . $this->getLang('daySgN') . '";';
            $script .= 'var dayPlN ="' . $this->getLang('dayPlN') . '";';
            $script .= 'var dayPlG ="' . $this->getLang('dayPlG') . '";';

            $script .= 'var pastevent="' . $this->getLang('pastevent') . '";';

            $script .= "var currentDate ='".$dateD."';";

            $script .='</script>';
            $renderer->doc .= $script;
            $renderer->doc .= "<span class='deadline'>";
            $renderer->doc .= $postdadline;
            $renderer->doc .= "</span>";
        }
        return false;
    }

}
