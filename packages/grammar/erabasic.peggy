// General
Script
= stmt:Statements LB?
{
  return {
    type: 'Script',
    children: stmt,
  }
}

Statements
= stmt:Statement others:(LB Statements)?
{
  if (others) {
    return [stmt, ...others[1]]
  } else {
    return [stmt]
  }
}

// Statement
Statement
= stmt:CompoundStatement { return stmt }
/ stmt:SimpleStatement { return stmt }

CompoundStatement
= stmt:Function { return stmt }

SimpleStatement
= stmt:LineComment { return stmt }
// / stmt:Assignment LineComment? { return stmt }
/ stmt:EmptyLine { return stmt }

// Compount Statement
Function
= _* '@' name:NB+ _* LB stmt:Statements
{
  return {
    type: 'Function',
    name: name.join(''),
    children: stmt,
  }
}

// Simple Statement
LineComment
= _* ';' _* text:NLB*
{
  return {
    type: 'LineComment',
    text: text.join('').trim()
  }
}

Assignment
= _* name:NB+ _* ('+'/'-'/'*'/'/')? '=' _* value:Expression _*
{ return { type: 'Assignment', name: name.join(''), value } }
// / _* name:NB+ _* '+=' _* value:Expression _* { return { type: 'Assignment', name: name.join(''), value } }
// / _* name:NB+ _* '-=' _* value:Expression _* { return { type: 'Assignment', name: name.join(''), value } }
// / _* name:NB+ _* '*=' _* value:Expression _* { return { type: 'Assignment', name: name.join(''), value } }
// / _* name:NB+ _* '/=' _* value:Expression _* { return { type: 'Assignment', name: name.join(''), value } }
// / _* name:NB+ _* '%=' _* value:Expression _* { return { type: 'Assignment', name: name.join(''), value } }

EmptyLine
= _*
{
  return {
    type: 'EmptyLine'
  }
}


// Expression
Expression
= sum:Sum { return { type: 'Expression', sum } }

// Sums
// = left:Sum _* '+' _* right:Sums { return { type: 'Sum', left } }
// / left:Sum _* '-' _* right:Term { return { type: 'Sum', left } }
// / left:Term { return { type: 'Sum', left } }

Sum
= value:Term (_* ('+' / '-') _* Term)*
{ return { type: 'Sum', value } }

Term
= value:Factor (_* ('*' / '/' / '%') _* Factor)*
{ return { type: 'Term', value } }

Factor
= value:('+' _* Factor) { return { type: 'Factor', value } }
/ value:('-' _* Factor) { return { type: 'Factor', value } }
/ value:Atom { return { type: 'Factor', value } }

Atom
= value:Integer { return { type: 'Atom', value } }
/ '(' _* Expression _* ')'
// Term
// = left:Factor _* '*' _* Factor { return { type: 'Term', left } }
// / left:Factor _* '/' _* Factor { return { type: 'Term', left } }
// / left:Factor _* '%' _* Factor { return { type: 'Term', left } }
// / left:Factor { return { type: 'Term', left } }

// Factor
// = '+' factor:Factor { return { type: 'Factor', factor } }
// / '-' factor:Factor { return { type: 'Factor', factor } }
// / factor:Primary { return { type: 'Factor', factor } }

// Primary
// = atom:Atom { return { type: 'Primary', atom } }

// Atom
// = integer:Integer { return { type: 'Atom', integer } }

Integer
= integer:[0-9]+ { return { type: 'Integer', integer: integer - 0 } }

// Shortcut
LB 'LineBreak'
= '\r'? '\n'

NLB 'NotLineBreak'
= [^\n\r]

_ 'WhiteSpace'
= [ \t]

NB 'NotBlank'
= [^ \n\t\r]
