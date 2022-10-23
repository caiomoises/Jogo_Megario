var x, y; //POSIÇÃO INICIAL DO JOGADOR 
var vermelho=1280, verde=1280, branco=1280; //POSIÇÃO INICIAL DOS VILOES
var velo=3, veloc=5, veloci=6, velocid=3; //VELOCIDADE DOS COGUMELOS 
var cenario=0, cenari=1350; //MOVIMENTO DO CEU
var pont=0; //CONTAGEM DE PONTOS
var disparo = false;
var x2, y2; //BALA DO TIRO
var x1, y1; //LUA
var x3, y3;
var azul; //CORAÇÃO
//var heroi; //HEROI
var vilao=[], vilao2=[], vilao3=[], i; //COGUMELOS
var dBala = []; //DISPARO DA BALA
var chao; //PISO
var espaco; //CEU
var lua; //LUA
var vida=10;//QUANTIDADE DE VIDAS 
var fim; //TELA DE GAME OVER
var fase;
var tela = 0; 
var flag = true;
const NUM_IMAGES = 23; //VETOR PARA O HEROI 
const PATH = "img/man";
var figs = [], i;
var time = 0;
var sprite = 1;
var animeSpeed = 1;
var mySound, i;
var c, h, a, o, p, w;
var pulo = false; 
var municao, ganhou, info;
function preload(){	
	mySound = loadSound('sounds/heykids.mp3');
	for(i=0;i<NUM_IMAGES;i++){	
		figs[i]= loadImage(PATH+i+'.png');
	}
	espaco = loadImage('ceu.jpg');
	for(i=0;i<3;i++){
		vilao[i] = loadImage('vermelho.png');
		vilao2[i] = loadImage('verde.png');
		vilao3[i] = loadImage('branco.png');
	}
	chao = loadImage('bloco.png');
	lua = loadImage('sol.png');
	fim = loadImage('gameover.jpg');
	ganhou = loadImage('ganhou.jpg');
	azul = loadImage('azul.png');	
	info = loadImage('info.jpg');
}
function setup(){
	mySound.setVolume(1);
	mySound.play();
	//CENARIO
	createCanvas(1350, 600); 
	municao=35;
	x = 60;
	y = 420;
	x1 = 40;
	y1 = 40;
	x3=978;
	y3=13;
	x4=1350;
	x5=1500;
	c=-28;
	h=265;
	a=555;
	o=845;
	p=1130;
	w=1400;
	fase=1;
}
function draw() {
	if(tela==0){
		background(0);
		image(info, 0, 0, 1350, 600);
		fill(0);
		if (keyIsDown(13)){
			tela=1;
		}
	}
		textSize(30);
	if(tela==2){
		background(0);
		image(fim, 0, 0, 1350, 600);
		fill(0);
		textSize(30);
		text("SUA PONTUACAO FOI: "+pont, 500, 500);	
		if (keyIsDown(13)){
			municao=35;
			tela=1;
			pont=0;
			x=60;
			vida=10;
		}
	}
	if(tela==3){
		background(0);
		image(ganhou, 0, 0, 1350, 600);
		fill(0);
		textSize(30);
		text("SUA PONTUACAO FOI: "+pont, 500, 500);	
		if (keyIsDown(13)){
			municao=35;
			tela=1;
			pont=0;
			x=60;
			vida=10;
		}
	}		
	if(tela==1){
		if(vida==0){
			tela=2;
		}
		if(pont==10){
			tela=3;
		}
		//imagem espaço
		image(espaco, cenario, 0, 1350, 500);
		image(espaco, cenari, 0, 1350, 500);  
		cenario-=2;
		cenari-=2;
		if(cenario<-1350){
			cenario=1350;
		}
		if(cenari<-1350){
			cenari=1350;
		}
		if(time%animeSpeed==0){
			image(figs[sprite],x,y, 80, 80);
			sprite++;
			if(sprite==NUM_IMAGES){
				sprite=0;		
			}
		}
		image(lua, x1, y1, 100, 100);
		//IMAGEM VILÃO
		for(i=0;i<3;i++){
			image(vilao[i],vermelho, 450,50,50);
			image (vilao2[i], verde, 450, 50, 50);	
			image (vilao3[i], branco, 450, 70, 50);
		}
		image(chao, c, 490, 350, 130);
		image(chao, h, 490, 350, 130);
		image(chao, a, 490, 350, 130);
		image(chao, o, 490, 350, 130); 
		image(chao, p, 490, 350, 130); 
		image(chao, w, 490, 350, 130); 
		image(azul, x3, y3, 20, 20);
		c-=2;
		h-=2;
		a-=2;
		o-=2;
		p-=2;
		w-=2;
		if(c<-350){
			c=1350;
		}
		if(h<-350){
			h=1350;
		} 
		if(a<-350){
			a=1350;
		}
		if(o<-350){
			o=1350;
		}
		if(p<-350){
			p=1350;
		}
		if(w<-350){
			w=1350;
		}				
		//TEXTO
		textSize(20);
		fill(255, 250, 250);
		text("MUNIÇÃO: "+municao, 600, 30);
		text("PONTOS: "+pont, 1200, 30);
		text("VIDAS: "+vida, 1000, 30);
		//FASES
		if(pont>49){
			vermelho=vermelho+velo-2;
			verde=verde+veloc+2;
			branco=branco+veloci+2;
			fase=2;
		}	
		if(pont>89){
			vermelho=vermelho+velo-3;
			verde=verde+veloc+4;
			branco=branco+veloci+4;
			fase=3;
		}   		
		textSize(20);
		fill(255);
		text("FASE: "+fase, 50, 30);
		//COLISSÃO 
		if(dist(vermelho+40, 400+50, x, y)<=25+10){
			vermelho=1279;
			vida=vida-1;
		}
		if(dist(verde+40, 400+50, x, y)<=25+10){				
			verde=1279;
			vida=vida-1;
		}
		if(dist(branco+40, 400+50, x, y)<=25+10){
			branco=1279;
			vida=vida-1;
		}
		//PULO
		/*if ((keyCode === UP_ARROW || keyCode === 32)  && heroi.onGround) // pule se possível
		heroi.jump();*/
		if (keyIsDown(32)&&y>=420) {
			while(y>100)
				y--;
		}
		//DISPARO
		fill(100, 149, 237);
		if (keyIsDown(87) && (! disparo)&& municao>0) { 
			disparo = true; 
			x2 = x;	
			y2 = y +25;	
			municao--;
		}
		if (disparo==true) {
			x2 = x2 + 10;
			if (x2 > 1300) {
				disparo = false;
			}
		}
		//TIRO
		for(i=0;i<10;i++){
			dBala[i] = int(dist(x2, y2, verde, y));
		}
		for(i=0;i<10;i++){
			if(dBala[i]<=28 && disparo) {
				verde = -random(height); 
				verde = random(width);
				disparo = false;
				pont=pont+2;
				verde = 1279;
			}
		}
		for(i=0;i<10;i++){
			dBala[i] = int(dist(x2, y2, vermelho, y));
		}
		for(i=0;i<10;i++){
			if(dBala[i]<=28 && disparo ){
				vermelho = -random(height); 
				vermelho = random(width);
				disparo = false;
				pont=pont+3;
				vermelho = 1279;
			}
		}
		for(i=0;i<10;i++){
			dBala[i] = int(dist(x2, y2, branco, y));
		}
		for(i=0;i<10;i++){
			if(dBala[i]<=28 && disparo ){
				branco = -random(height); 
				branco = random(width);
				disparo = false;
				pont++;
				branco = 1279;
			}
		}
		if (x < 1350){
			x = x;
		}else{
			x=-30;
		}
		if(x<-30){
			x=1350;
		}
		if(y<420){
			y = y+10;
		}
		if(vermelho+0>=1280){
			velo=velo*-1;
		}
		if(vermelho<0){
			vermelho=1280;
		}
		if(verde>=1280){
			veloc=veloc*-1;
		}
		if(verde<0){
			verde=1280;
		}
		if(branco>=1280){
			veloci=veloci*-1;
		}
		if(branco<0){
			branco=1280;
		}
		//JOGADOR
		fill(0, 191, 255);	
		if (disparo) {
			ellipse(x2,y2,10,10);
		}
		noStroke();
		//OBSTACULOS
		vermelho=vermelho+velo;
		verde=verde+veloc;
		branco=branco+veloci;
	}
}	
