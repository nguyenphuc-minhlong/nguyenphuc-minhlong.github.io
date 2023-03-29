function KarelParser(){Parser.call(this);this.scanner.addWordCharacters("_");this.operators={};this.defineOperators()}KarelParser.prototype=new XParser;KarelParser.prototype.constructor=KarelParser;
KarelParser.prototype.defineOperators=function(){this.definePrefixOperator("(",this.parenOperator,0,"RIGHT");this.definePrefixOperator("!",this.prefixOperator,100);this.defineInfixOperator("(",this.applyOperator,110,"RIGHT");this.defineInfixOperator("&&",this.infixOperator,30);this.defineInfixOperator("||",this.infixOperator,20)};KarelParser.statementForms={};
KarelParser.statementForms["if"]=function(a){a.verifyToken("(");var b=a.readPredicate();a.verifyToken(")");var c=a.readStatement(),d=a.nextToken();if("else"==d.text)return["if",b,c,a.readStatement()];a.saveToken(d);return["if",b,c]};KarelParser.statementForms["while"]=function(a){a.verifyToken("(");var b=a.readPredicate();console.log(b);a.verifyToken(")");return["while",b,a.readStatement()]};
KarelParser.statementForms.repeat=function(a){a.verifyToken("(");var b=a.nextToken();a.verifyToken(")");a=a.readStatement();return["repeat",TokenScanner.getNumber(b.text),a,["lineNumber",lineNumber]]};
KarelParser.statementForms["for"]=function(a){a.verifyToken("(");a.verifyToken("int");var b=a.nextToken(),c=b.text;b=b.lineNumber;a.verifyToken("=");a.verifyToken("0");a.verifyToken(";");if(a.nextToken().text!=c)throw Error("We expect for loops for karel to be in standard form.");a.verifyToken("<");var d=a.nextToken().text;if("="==d)throw Error("We expect for loops for karel to be in standard form.");if(TokenScanner.getTokenType(d)!=TokenScanner.NUMBER)throw Error("The repeat statement requires an integer");
a.verifyToken(";");if(a.nextToken().text!=c)throw Error("We expect for loops for karel to be in standard form.");a.verifyToken("+");a.verifyToken("+");a.verifyToken(")");return["repeat",TokenScanner.getNumber(d),a.readStatement(),["lineNumber",b]]};KarelParser.prototype.readImport=function(){for(;;){var a=this.nextToken();if("import"!=a.text){this.saveToken(a);break}for(;";"!=a.text;)a=this.nextToken()}};
KarelParser.prototype.readClass=function(){var a=this.nextToken().text;if("class"==a)throw Error("classes should be public or private");if("public"!=a&&"private"!=a)throw Error("classes should be public or private, not "+a);this.verifyToken("class");var b=this.nextToken().text;if(!this.scanner.isValidIdentifier(b))throw Error('"'+b+'" is not a legal class name');this.verifyToken("extends");var c=this.nextToken().text;if(!c in{Karel:!0,SuperKarel:!0,EsKarel:!0})throw Error("Karel programs should extend Karel or EsKarel");
this.verifyToken("{");for(var d={};;){a=this.nextToken();if(""==a.text)break;this.saveToken(a);if("}"==a.text)break;a=this.readFunction();var e=a[1];if(e in d)throw Error("Method "+e+" already defined");d[e]=a}this.verifyToken("}");return["class",b,c,d]};
KarelParser.prototype.readFunction=function(){var a=this.nextToken().text;if("void"==a)throw Error("methods should be public or private");if("public"!=a&&"private"!=a)throw Error("methods should be public or private, not "+a);this.verifyToken("void");a=this.nextToken().text;if(!this.scanner.isValidIdentifier(a))throw Error('"'+a+'" is not a legal function name');this.verifyToken("(");this.verifyToken(")");console.log("parsing fn "+a);var b=this.nextToken("{");if("{"!=b.text)throw Error("Methods should have an open bracket, {");
this.saveToken(b);return["function",a,this.readStatement()]};KarelParser.prototype.readStatement=function(){var a=this.nextToken();if("{"==a.text){for(var b=["block"];;){a=this.nextToken();if("}"==a.text)break;this.saveToken(a);a=this.readStatement();b.push(a)}return b}b=a.text;a=a.lineNumber;var c=KarelParser.statementForms[b];if(c)return c(this);this.verifyToken("(");this.verifyToken(")");this.verifyToken(";");return["stmt",["call",b],["lineNumber",a]]};KarelParser.prototype.readPredicate=function(){return this.readE(0)};