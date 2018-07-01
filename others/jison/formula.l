param_ref #[A-Za-z]+
constant [0-9]+(\.[0-9]+)?

%%
[\t\v\n\f] {}
"#sqrt" { return 'SQRT'; }
{param_ref} { return 'PARAM_REF'; }
{constant} { return 'CONSTANT'; }
"+" { return '+'; }
"-" { return '-'; }
"*" { return '*'; }
"/" { return '/'; }
. { return yytext; }
%%
