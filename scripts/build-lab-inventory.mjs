import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const { Workbook, SpreadsheetFile } = await import(process.env.ARTIFACT_TOOL_MODULE || '@oai/artifact-tool');

const base=path.dirname(fileURLToPath(import.meta.url));
const input=process.argv[2]??path.join(base,'../src/content/lab-inventory.json');
const outputDir=process.argv[3]??path.join(base,'../.inventory-output');
const data=JSON.parse(await fs.readFile(input,'utf8'));
const pricedItems=data.items.filter(x=>[x.quantity,x.unitCostUSD,x.shippingPerUnitUSD,x.sourceRoundingAdjustmentUSD].every(Number.isFinite));
const expectedCost=pricedItems.reduce((sum,x)=>sum+Math.round(x.quantity*(x.unitCostUSD+x.shippingPerUnitUSD))+x.sourceRoundingAdjustmentUSD,0);
const expectedPower=scope=>['idleW','workingW','heavyW'].map(k=>data.powerGroups.filter(g=>!scope||g.scope===scope).reduce((sum,g)=>sum+g[k],0));
assert.equal(new Set(data.items.map(x=>x.id)).size,data.items.length,'Duplicate equipment ID');
assert.equal(new Set(data.powerGroups.map(x=>x.id)).size,data.powerGroups.length,'Duplicate power group ID');
for(const x of data.items)assert.ok(x.powerGroupId==='none'||data.powerGroups.some(g=>g.id===x.powerGroupId),`Missing power group ${x.powerGroupId}`);
await fs.mkdir(outputDir,{recursive:true});
const workbook=Workbook.create();
const overview=workbook.worksheets.add('Overview');
const inventory=workbook.worksheets.add('Inventory');
const power=workbook.worksheets.add('Power model');
const c={ink:'#111315',cream:'#F4F2EA',paper:'#FCFCF9',orange:'#FF553D',line:'#D8D8D0',muted:'#555851',input:'#FFF2CA'};
const money='$'+'#,##0;($#,##0);'+'"-"';
const money2='$'+'#,##0.00;($#,##0.00);'+'"-"';
const decimal='#,##0.0';
function cell(sh,ref,v){sh.getRange(ref).values=[[v]];}
function formula(sh,ref,v){sh.getRange(ref).formulas=[[v]];}
function widths(sh,cols){Object.entries(cols).forEach(([k,v])=>{sh.getRange(`${k}:${k}`).format.columnWidth=v;});}
function baseStyle(sh,range){sh.showGridLines=false;sh.getRange(range).format={font:{name:'Arial',size:11,color:c.ink},fill:c.paper,verticalAlignment:'center',rowHeight:24};}
function title(sh,text,ref='A2'){cell(sh,ref,text);sh.getRange(ref).format.font={name:'Arial',size:16,bold:true,color:c.ink};}
function header(sh,range){sh.getRange(range).format={fill:c.ink,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},wrapText:true,horizontalAlignment:'center',verticalAlignment:'center',rowHeight:38,borders:{insideVertical:{style:'thin',color:'#FFFFFF'}}};}
function rule(sh,range){sh.getRange(range).format.borders={bottom:{style:'thin',color:c.orange}};}
function note(sh,ref,text){cell(sh,ref,text);sh.getRange(ref).format.font={name:'Arial',size:11,color:c.muted};}
const first=8,last=first+data.items.length-1;
const pFirst=8,pLast=pFirst+data.powerGroups.length-1;

baseStyle(overview,'A1:D35');widths(overview,{A:61,B:19,C:19,D:19});overview.tabColor=c.ink;
title(overview,'Hackers in the Loop');cell(overview,'A3','Lab inventory, replacement costs and power estimates');rule(overview,'A3:D3');
cell(overview,'A4','Snapshot');cell(overview,'B4',new Date(`${data.snapshot}T12:00:00Z`));overview.getRange('B4').setNumberFormat('mmm d, yyyy');
overview.getRange('A6:B6').values=[['Replacement cost estimate','USD']];header(overview,'A6:B6');
cell(overview,'A7','Compute and add-ons');cell(overview,'A8','Rack and shared');cell(overview,'A9','Total replacement estimate');
formula(overview,'B7',`=IF(COUNTIFS('Inventory'!J${first}:J${last},A7,'Inventory'!G${first}:G${last},"Missing input")=0,SUMIFS('Inventory'!G${first}:G${last},'Inventory'!J${first}:J${last},A7),"Missing input")`);
formula(overview,'B8',`=IF(COUNTIFS('Inventory'!J${first}:J${last},A8,'Inventory'!G${first}:G${last},"Missing input")=0,SUMIFS('Inventory'!G${first}:G${last},'Inventory'!J${first}:J${last},A8),"Missing input")`);
formula(overview,'B9','=IF(COUNT(B7:B8)=2,SUM(B7:B8),"Missing input")');overview.getRange('B7:B9').setNumberFormat(money);
overview.getRange('A9:B9').format={fill:c.cream,font:{bold:true}};
cell(overview,'A10','Priced equipment subtotal');formula(overview,'B10',`=SUM('Inventory'!G${first}:G${last})`);overview.getRange('B10').setNumberFormat(money);
note(overview,'A11','Full total needs all prices. Subtotal excludes unpriced equipment; it is not an amount paid.');
note(overview,'A12','Before tax and shipping, except the touchscreen. Inventory shows each cost input.');
note(overview,'A13','The published KVM line rounds $118.47 to $119. Its $1 adjustment is shown separately.');

overview.getRange('A15:D15').values=[['Wall-power estimate','Idle (W)','Working (W)','Heavy (W)']];header(overview,'A15:D15');
cell(overview,'A16','Core cluster');cell(overview,'A17','Whole lab');
for(let i=0;i<3;i++){const col=String.fromCharCode(66+i),source=String.fromCharCode(68+i);formula(overview,`${col}16`,`='Power model'!${source}${pLast+3}`);formula(overview,`${col}17`,`='Power model'!${source}${pLast+4}`);}
overview.getRange('B16:D17').setNumberFormat(decimal);overview.getRange('A17:D17').format.fill=c.cream;
note(overview,'A19','Working: mixed inference, development, storage and bench activity.');
note(overview,'A20','Heavy: the modeled systems are busy together. These are estimates, not meter readings.');
note(overview,'A22','Each power group is counted once. Inventory identifies included components and spares.');
note(overview,'A23','The whole-lab model uses one V100 in the GPU dock and one installed PCIe FPGA.');
note(overview,'A24','Agent Blade watts are projected. Newly acquired equipment is excluded until modeled.');
note(overview,'A25','Cooling, household router and post-outage battery recharge are excluded.');
note(overview,'A26','The 750 VA UPS estimate covers overhead on an essential-load branch.');
cell(overview,'A28','Keeping the inventory current');overview.getRange('A28').format.font.bold=true;rule(overview,'A28:D28');
note(overview,'A29','Use the item IDs and power-group IDs when updating equipment, quantities or estimates.');
note(overview,'A30','Update amber cost inputs and the power rows, then review the totals and snapshot date.');
note(overview,'A31','Add new records through the maintained data file and regenerate to extend all formulas.');
note(overview,'A32','Reference prices: September 11–12, 2026; reported acquisition costs: September 18.');

baseStyle(inventory,`A1:L${last+5}`);widths(inventory,{A:12,B:51,C:8,D:13,E:13,F:14,G:15,H:17,I:48,J:23,K:3,L:74});
title(inventory,'Lab inventory');rule(inventory,'A3:J3');
note(inventory,'A4','Line cost = rounded quantity × (unit estimate + shipping per unit) + source rounding adjustment.');
note(inventory,'A5','Blank costs are unknown, not zero. Newly acquired equipment has its status in the source note.');
inventory.getRange('A7:J7').values=[['Item ID','Equipment and specifications','Qty','Unit cost (USD)','Shipping / unit (USD)','Source rounding (USD)','Line cost (USD)','Power group ID','Power treatment','Cost category']];header(inventory,'A7:J7');
cell(inventory,'L7','Price reference and source note');header(inventory,'L7');
const itemRows=data.items.map(x=>[x.id,x.name,x.quantity,x.unitCostUSD,x.shippingPerUnitUSD,x.sourceRoundingAdjustmentUSD,null,x.powerGroupId,x.powerTreatment,x.category]);
inventory.getRange(`A${first}:J${last}`).values=itemRows;
inventory.getRange(`L${first}:L${last}`).values=data.items.map(x=>[`${x.sourceNote}${x.sourceUrls.length?'\n'+x.sourceUrls.map(u=>u.url).join('\n'):''}`]);
for(let r=first;r<=last;r++)formula(inventory,`G${r}`,`=IF(COUNT(C${r}:F${r})=4,ROUND(C${r}*(D${r}+E${r}),0)+F${r},"Missing input")`);
inventory.getRange(`B${first}:B${last}`).format.wrapText=true;inventory.getRange(`I${first}:J${last}`).format.wrapText=true;
inventory.getRange(`A${first}:J${last}`).format.rowHeight=57;
inventory.getRange(`L${first}:L${last}`).format={wrapText:true,verticalAlignment:'top',font:{size:11,color:c.muted}};
inventory.getRange(`C${first}:F${last}`).format.fill=c.input;
inventory.getRange(`C${first}:C${last}`).setNumberFormat('#,##0');inventory.getRange(`D${first}:E${last}`).setNumberFormat(money2);
inventory.getRange(`F${first}:G${last}`).setNumberFormat(money);
inventory.getRange(`G${first}:G${last}`).format.font.bold=true;
inventory.getRange(`C${first}:G${last}`).format.horizontalAlignment='right';
inventory.getRange(`H${first}:H${last}`).format.horizontalAlignment='center';
inventory.getRange(`C${first}:C${last}`).dataValidation={rule:{type:'whole',operator:'greaterThanOrEqual',formula1:0}};
inventory.getRange(`D${first}:E${last}`).dataValidation={rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}};
for(let r=first;r<=last;r++){if((r-first)%2)inventory.getRange(`A${r}:B${r}`).format.fill=c.cream;}
cell(inventory,`A${last+2}`,'Total replacement estimate');formula(inventory,`G${last+2}`,`=IF(COUNT(G${first}:G${last})=ROWS(G${first}:G${last}),SUM(G${first}:G${last}),"Missing input")`);inventory.getRange(`G${last+2}`).setNumberFormat(money);
inventory.getRange(`A${last+2}:J${last+2}`).format={fill:c.cream,font:{bold:true},rowHeight:30};
inventory.freezePanes.freezeRows(7);inventory.freezePanes.freezeColumns(2);
const it=inventory.tables.add(`A7:J${last}`,true,'LabInventory');it.showFilterButton=true;it.style='TableStyleLight1';
inventory.getRange(`G${first}:G${last}`).conditionalFormats.add('containsText',{text:'Missing input',format:{fill:'#FCE7E7',font:{color:'#991B1B',bold:true}}});

baseStyle(power,`A1:I${pLast+10}`);widths(power,{A:17,B:47,C:19,D:13,E:13,F:13,G:72,H:3,I:78});
title(power,'Power model');rule(power,'A3:G3');
note(power,'A4','Watts at the wall per group, including the parts described. Do not multiply by inventory quantity.');
note(power,'A5','Bench additions expand the core cluster into the whole-lab scenario. Spare and uninstalled swap cards are excluded.');
power.getRange('A7:G7').values=[['Power group ID','Equipment group','Scope','Idle (W)','Working (W)','Heavy (W)','Included equipment and estimate basis']];header(power,'A7:G7');
cell(power,'I7','Supporting reference');header(power,'I7');
power.getRange(`A${pFirst}:G${pLast}`).values=data.powerGroups.map(g=>[g.id,g.name,g.scope,g.idleW,g.workingW,g.heavyW,g.basis]);
power.getRange(`I${pFirst}:I${pLast}`).values=data.powerGroups.map(g=>[g.sourceUrls.length?g.sourceUrls.map(x=>`${x.label}\n${x.url}`).join('\n'): 'Component-based planning estimate from the September 12, 2026 power notes.']);
power.getRange(`B${pFirst}:C${pLast}`).format.wrapText=true;power.getRange(`G${pFirst}:G${pLast}`).format.wrapText=true;
power.getRange(`I${pFirst}:I${pLast}`).format={wrapText:true,verticalAlignment:'top',font:{size:11,color:c.muted}};
power.getRange(`A${pFirst}:I${pLast}`).format.rowHeight=76;
power.getRange(`D${pFirst}:F${pLast}`).format.fill=c.input;power.getRange(`D${pFirst}:F${pLast}`).setNumberFormat(decimal);
power.getRange(`D${pFirst}:F${pLast}`).format.horizontalAlignment='right';
power.getRange(`C${pFirst}:C${pLast}`).dataValidation={rule:{type:'list',values:['Core','Bench addition']}};
power.getRange(`D${pFirst}:F${pLast}`).dataValidation={rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}};
cell(power,`A${pLast+3}`,'Core cluster');cell(power,`A${pLast+4}`,'Whole lab');
for(const col of ['D','E','F']){formula(power,`${col}${pLast+3}`,`=IF(COUNT(${col}${pFirst}:${col}${pLast})=ROWS(${col}${pFirst}:${col}${pLast}),SUMIFS(${col}${pFirst}:${col}${pLast},C${pFirst}:C${pLast},"Core"),"Missing input")`);formula(power,`${col}${pLast+4}`,`=IF(COUNT(${col}${pFirst}:${col}${pLast})=ROWS(${col}${pFirst}:${col}${pLast}),SUM(${col}${pFirst}:${col}${pLast}),"Missing input")`);}
power.getRange(`A${pLast+3}:G${pLast+4}`).format={fill:c.cream,font:{bold:true},rowHeight:30};power.getRange(`D${pLast+3}:F${pLast+4}`).setNumberFormat(decimal);
note(power,`A${pLast+6}`,'Room cooling, household router, and battery recharge after an outage are excluded.');
note(power,`A${pLast+7}`,'UPS overhead assumes essential loads only. The 850 W dock PSU label is its rating, not consumption.');
power.freezePanes.freezeRows(7);power.freezePanes.freezeColumns(2);
const pt=power.tables.add(`A7:G${pLast}`,true,'LabPower');pt.showFilterButton=true;pt.style='TableStyleLight1';
power.getRange(`F${pFirst}:F${pLast}`).format.borders={right:{style:'thin',color:c.line}};
for(let r=first;r<=last;r++){const ref=inventory.getRange(`L${r}`).values[0][0];const lines=ref.split('\n').reduce((n,t)=>n+Math.ceil(t.length/85),0);if(lines>3)inventory.getRange(`A${r}:L${r}`).format.rowHeight=Math.max(57,lines*14+7);}

// Test representative edits and restore them before final export.
const qa={input,items:data.items.length,powerGroups:data.powerGroups.length,checks:[]};
const value=(sh,ref)=>sh.getRange(ref).values[0][0];
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<0.00001,`${actual} != ${expected}`);
const item0=data.items[0],base0=Math.round(item0.quantity*(item0.unitCostUSD+item0.shippingPerUnitUSD))+item0.sourceRoundingAdjustmentUSD;
const totalCheck=(expected)=>{close(value(overview,'B10'),expected); if(pricedItems.length===data.items.length)close(value(overview,'B9'),expected);else assert.equal(value(overview,'B9'),'Missing input');};
totalCheck(expectedCost);close(value(inventory,'G8'),base0);
cell(inventory,'C8',item0.quantity+1);const plus=Math.round((item0.quantity+1)*(item0.unitCostUSD+item0.shippingPerUnitUSD))+item0.sourceRoundingAdjustmentUSD;close(value(inventory,'G8'),plus);totalCheck(expectedCost-base0+plus);cell(inventory,'C8',item0.quantity);
cell(inventory,'D8',0);const zeroLine=Math.round(item0.quantity*item0.shippingPerUnitUSD)+item0.sourceRoundingAdjustmentUSD;close(value(inventory,'G8'),zeroLine);totalCheck(expectedCost-base0+zeroLine);cell(inventory,'D8',item0.unitCostUSD);
cell(inventory,'D8',null);assert.equal(value(inventory,'G8'),'Missing input');assert.equal(value(overview,'B9'),'Missing input');cell(inventory,'D8',item0.unitCostUSD);
const p0=data.powerGroups[0];cell(power,'D8',p0.idleW+10);close(value(overview,'B16'),expectedPower('Core')[0]+(p0.scope==='Core'?10:0));close(value(overview,'B17'),expectedPower()[0]+10);cell(power,'D8',p0.idleW);
cell(power,'D8',null);assert.equal(value(overview,'B16'),'Missing input');assert.equal(value(overview,'B17'),'Missing input');cell(power,'D8',p0.idleW);
qa.checks.push('Quantity change updates rounded line cost and overall total.','Zero unit cost is preserved as a real zero.','Blank cost input remains visible in line cost and total.','Group power change updates both core and whole-lab totals.','Blank power input remains visible in totals.','Stable equipment and power IDs are unique and every item power mapping resolves.');
// An unpriced acquisition must become part of the full total when a price is entered.
for (const item of data.items.filter(x=>x.unitCostUSD===null)) { const row=first+data.items.indexOf(item); assert.equal(value(inventory,`G${row}`),'Missing input'); cell(inventory,`D${row}`,100); close(value(overview,'B10'),expectedCost+item.quantity*100); if(pricedItems.length===data.items.length-1)close(value(overview,'B9'),expectedCost+item.quantity*100); cell(inventory,`D${row}`,null); }
workbook.recalculate();
totalCheck(expectedCost);
['B','C','D'].forEach((col,i)=>{close(value(overview,`${col}16`),expectedPower('Core')[i]);close(value(overview,`${col}17`),expectedPower()[i]);});
const inspections=[];
inspections.push((await workbook.inspect({kind:'table',range:'Overview!A6:D17',include:'values,formulas',tableMaxRows:12,tableMaxCols:4,maxChars:9000})).ndjson);
inspections.push((await workbook.inspect({kind:'table',range:'Inventory!A43:J45',include:'values,formulas',tableMaxRows:3,tableMaxCols:10,maxChars:7000})).ndjson);
const errors=await workbook.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'Final formula scan',maxChars:5000});
qa.formulaErrorScan=errors.ndjson;
await fs.writeFile(path.join(outputDir,'inspection.ndjson'),inspections.join('\n')+'\n'+errors.ndjson);
if(process.argv.includes('--verify-only')){console.log(JSON.stringify({verificationOnly:true,items:data.items.length,expectedCost,actualCost:value(overview,'B9'),pricedSubtotal:value(overview,'B10'),checks:qa.checks,formulaErrorScan:errors.ndjson}));process.exit(0);}
for(const [name,sheetName,range] of [
 ['overview','Overview','A1:D33'],['inventory-end','Inventory',`A${Math.max(first,last-3)}:J${last+2}`], ['acquisition-reference','Inventory',`L${last}:L${last}`]
]){const blob=await workbook.render({sheetName,range,scale:1.4,format:'png'});await fs.writeFile(path.join(outputDir,`${name}.png`),new Uint8Array(await blob.arrayBuffer()));}
const output=await SpreadsheetFile.exportXlsx(workbook);const outputPath=path.join(outputDir,'hackers-in-the-loop-lab-inventory.xlsx');await output.save(outputPath);
qa.output=outputPath;qa.controls=data.controls;qa.sheets=['Overview','Inventory','Power model'];
await fs.writeFile(path.join(outputDir,'qa.json'),JSON.stringify(qa,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,items:data.items.length,powerGroups:data.powerGroups.length,totalUSD:value(overview,'B9'),pricedSubtotalUSD:value(overview,'B10'),corePowerW:['B','C','D'].map(c=>value(overview,`${c}16`)),wholeLabPowerW:['B','C','D'].map(c=>value(overview,`${c}17`)),formulaErrorScan:errors.ndjson}));
