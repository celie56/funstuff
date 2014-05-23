set timeoutlen=200
inoremap kj <Esc>
inoremap <C-BS> <C-W>
nnoremap ]] :tabn<CR>


set tabstop=4
set autoindent
set cindent
set shiftwidth=4
set number

set nocompatible

filetype on
filetype plugin on
syntax enable
syntax on
set grepprg=grep\ -nH\ $*

set backspace=indent,eol,start

hi Comment ctermfg=blue
