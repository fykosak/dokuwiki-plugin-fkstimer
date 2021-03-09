<?php

use dokuwiki\Extension\SyntaxPlugin;

class syntax_plugin_timer extends SyntaxPlugin {

    public function getType(): string {
        return 'substition';
    }

    public function getPType(): string {
        return 'normal';
    }

    public function getSort(): int {
        return 225;
    }

    public function connectTo($mode): void {
        $this->Lexer->addSpecialPattern('{{timer>.+?}}', $mode, 'plugin_timer');
    }

    public function handle($match, $state, $pos, Doku_Handler $handler): array {

        switch ($state) {
            case DOKU_LEXER_SPECIAL:
                $match = substr($match, 8, -2);
                $dateString = date('Y-m-d\TH:i:s', strtotime($match));
                return [$state, ['date' => $dateString]];
            default:
                return [$state, []];
        }
    }

    public function render($mode, Doku_Renderer $renderer, $data): bool {

        if ($mode == 'xhtml') {
            [$state, $params] = $data;
            switch ($state) {
                case DOKU_LEXER_SPECIAL:
                    $renderer->doc .= '<span class="timer" data-date="' . $params['date'] . '"></span>';
                    return true;
                default:
                    return true;
            }
        }
        return false;
    }
}
