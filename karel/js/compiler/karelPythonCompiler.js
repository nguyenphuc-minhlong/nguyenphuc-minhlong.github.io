function KarelPythonCompiler(g){var a={};a.vm=new KarelVM(g);a.compile=function(c){a.vm.resetTempCounter();var b=new KarelPythonParser;b.setInput(c);b.readImport();var e=b.readClass()[3];c=[];var f=[],d;for(d in e)b=e[d],f.push(d),c.push(b);a.vm.setUserFnNames(f);for(d=0;d<c.length;d++)b=c[d],e=[],a.vm.compile(b[2],e),e.push(new ReturnIns),a.vm.functions[b[1]]=e;a.vm.reset();a.vm.startCheck("main")};a.executeStep=function(){var c=a.vm;if(!c.cf)return{isDone:!0};for(var b=!0;b;)c.atStatementBoundary()&&
(b=!1),c.step();return{isDone:!1,lineNumber:c.getCurrLineNum()}};return a};
