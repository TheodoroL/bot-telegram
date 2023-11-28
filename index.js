import {Telegraf}  from 'telegraf'
import 'dotenv/config'

let bot =  new Telegraf(process.env.BOT_TOKEN ); 

let config = {
    method: 'GET', 
    headers: {
        'content-type': 'application/json; charset=utf-8',  
        'Authorization': `Bearer ${process.env.TOKEN}`
    }

}; 

bot.help(ctx=>{
    ctx.reply("os comandos que estão disponivel são !user e o !proximobau\nComo usar eles ?é bem simples, basta usar o comando(qual quer um deles)+ o id do jogador, exemplo:\n\n!user id do jogador\n\n!proximobau id do jogador")
})

bot.hears(/^!user (.+)$/, async ctx=>{
    let mensagem = ctx.match[1];
    if(mensagem.includes("#")){
        mensagem = mensagem.replace("#", "%23");
        mensagem = mensagem.replace(" ", "");  
        try{
            let resposta = await fetch(`https://api.clashroyale.com/v1/players/${mensagem}`, config);
            let resjson = await resposta.json(); 
            
            try{
                ctx.reply(`nome:${resjson["name"]}\ntag:${resjson["tag"]}\nnivel:${resjson['expLevel']}\ntroféus:${resjson['trophies']}\nvitórias:${resjson['wins']}\nderrotas:${resjson['losses']}\nclã:${resjson['clan']['name']}\narena:${resjson['arena']['name']}`); 
            }
            catch{
                ctx.reply(`nome:${resjson["name"]}\ntag:${resjson["tag"]}\nnivel:${resjson['expLevel']}\ntroféus:${resjson['trophies']}\nvitórias:${resjson['wins']}\nderrotas:${resjson['losses']}\narena:${resjson['arena']['name']}`);

            }
        }
        catch{
            ctx.reply("id invalido..."); 
        }
    }
    else{
        ctx.reply("id invalido..."); 

    }
   
})

bot.hears(/^!proximobau(.+)$/, async ctx=>{
    let mensagem = ctx.match[1]; 
    if(mensagem.includes("#")){
        mensagem = mensagem.replace("#", "%23");
        mensagem = mensagem.replace(" ", ""); 

        try{
            let resposta = await fetch(`https://api.clashroyale.com/v1/players/${mensagem}/upcomingchests`, config);
            let resjson = await resposta.json(); 
            try{    
               ctx.reply(`----------------------------------------------------------------
               index: ${resjson['items'][0]['index']} bau: ${resjson['items'][0]['name']}
               index: ${resjson['items'][1]['index']} bau: ${resjson['items'][1]['name']}
               index: ${resjson['items'][2]['index']} bau: ${resjson['items'][2]['name']}
               index: ${resjson['items'][3]['index']} bau: ${resjson['items'][3]['name']}
               index: ${resjson['items'][4]['index']} bau: ${resjson['items'][4]['name']}
               --------------------------------------------------------------------------
               `);
                 
            }catch{
                ctx.reply('algum erro ocorreu, verifica o seu id');  

            }

        }catch{
            ctx.reply("id invalido..."); 
        }
    }
    else{
        ctx.reply("id invalido..."); 
    }   
})




console.log("bot on..."); 
bot.launch();