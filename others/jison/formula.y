%token PARAM_REF CONSTANT
%token SQRT

%left '+' '-'
%left '*' '/'
%left UMINUS

%start formula

%%
expr : PARAM_REF {
    $$ = {value: yytext}
}   | CONSTANT {
    $$ = {value: yytext}
};

expr : expr '+' expr {
    $$ = {children: [$1, $3], type: "add"}
}
    | expr '-' expr {
    $$ = {children: [$1, $3], type: "sub"}
}
    | expr '*' expr {
    $$ = {children: [$1, $3], type: "mul"}
}
    | expr '/' expr {
    $$ = {children: [$1, $3], type: "div"}
}
    | '(' expr ')' {
    $$ = {children: [$2], type: "a"}
}
    | SQRT '(' expr ')' {
    $$ = {children: [$3], type: "sqrt"}
}
    | '-' expr %prec UMINUS {
    $$ = {children: [$2], type: "minus"}
};

formula : {
    return null;
}
    | expr {
    return $1;
};
%%
