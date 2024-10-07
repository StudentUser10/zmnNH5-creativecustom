import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('abcb4206-3207-494f-a15e-3fdda0f7f474', '10Enrico79@yahoo.com', 'Joo Silva', 'https://i.imgur.com/YfJQV5z.png?id=12', 'mno345pqr678', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('f4813c36-264d-4e57-854e-a8c0a8f6cde1', '19Kameron24@hotmail.com', 'Maria Oliveira', 'https://i.imgur.com/YfJQV5z.png?id=21', 'yz567abc890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('89c10969-1533-4ed8-9295-af632a81c18b', '28Joyce.Steuber@gmail.com', 'Maria Oliveira', 'https://i.imgur.com/YfJQV5z.png?id=30', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('5928c395-7d22-467e-93f7-f31034d3384f', '37Heidi_Franey@yahoo.com', 'Carlos Santos', 'https://i.imgur.com/YfJQV5z.png?id=39', 'yz567abc890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('cb44624f-94fa-4074-8298-827576b38eea', '46Edgar76@yahoo.com', 'Carlos Santos', 'https://i.imgur.com/YfJQV5z.png?id=48', 'abc123def456', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('72a64cf0-939a-4693-b283-b91c2234956e', '55Clinton92@hotmail.com', 'Maria Oliveira', 'https://i.imgur.com/YfJQV5z.png?id=57', 'abc123def456', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('ca3626e1-b81b-476b-88bf-e56faf60e3b7', '64Felipa.Schamberger14@yahoo.com', 'Ana Costa', 'https://i.imgur.com/YfJQV5z.png?id=66', 'ghi789jkl012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('5326681b-a8eb-4fa6-8650-13960d81dc5c', '73Sammie.Cruickshank46@yahoo.com', 'Maria Oliveira', 'https://i.imgur.com/YfJQV5z.png?id=75', 'stu901vwx234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('a243ae29-7c29-4e99-85c3-f98774819ecf', '82Caden.Hyatt@gmail.com', 'Joo Silva', 'https://i.imgur.com/YfJQV5z.png?id=84', 'mno345pqr678', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Category" ("id", "name", "description") VALUES ('5affa2b0-4214-495a-a7bf-99eb5e46cb90', 'Almofadas Exclusivas', 'Canecas com designs criativos que podem ser personalizados com suas fotos e textos.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('b2f0b3c6-8d5c-4bee-bc51-a4e7a06222a9', 'Capas de Celular', 'Canecas com designs criativos que podem ser personalizados com suas fotos e textos.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('34e28148-862d-4b5c-8fc1-c27894fbb6fa', 'Quadros Decorativos', 'Camisetas com estampas nicas e personalizveis para todas as ocasies.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('e3842968-318b-4976-8022-f6c09095bdbb', 'Almofadas Exclusivas', 'Canecas com designs criativos que podem ser personalizados com suas fotos e textos.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('5f1fe2fb-47ca-4a43-86a0-4ebbda5c045c', 'Almofadas Exclusivas', 'Almofadas confortveis e personalizveis perfeitas para decorar qualquer espao.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('e583d086-a669-43aa-9d83-fab97bad36b0', 'Capas de Celular', 'Quadros decorativos que podem ser personalizados para dar um toque especial ao seu ambiente.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('19745db9-dcfa-428b-a509-61ec1834e47e', 'Camisetas Personalizadas', 'Quadros decorativos que podem ser personalizados para dar um toque especial ao seu ambiente.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('43946414-8a50-41ca-aa72-b09b5fab6a6d', 'Canecas Criativas', 'Camisetas com estampas nicas e personalizveis para todas as ocasies.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('28de9f19-a46d-4506-94d2-d69b52eab549', 'Canecas Criativas', 'Camisetas com estampas nicas e personalizveis para todas as ocasies.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('3b54dd26-da0c-417a-b520-6b829da5d83e', 'Almofadas Exclusivas', 'Almofadas confortveis e personalizveis perfeitas para decorar qualquer espao.');

INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('47083e62-6fea-40cb-8497-b4edb2e3cb4f', 'Almofada Estampada', 'Caneca de cermica com design exclusivo.', '29.99', 'https://i.imgur.com/YfJQV5z.png?id=124', '5affa2b0-4214-495a-a7bf-99eb5e46cb90');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('6b602ca1-8941-437b-9025-e5ab263b8981', 'Caneca Criativa', 'Caneca de cermica com design exclusivo.', '18.90', 'https://i.imgur.com/YfJQV5z.png?id=129', 'e3842968-318b-4976-8022-f6c09095bdbb');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('be802c50-c7c2-4c04-a2b6-cdf04d21cca1', 'Caderno Customizado', 'Poster em papel fotogrfico com arte nica.', '15.50', 'https://i.imgur.com/YfJQV5z.png?id=134', 'e583d086-a669-43aa-9d83-fab97bad36b0');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('f8782228-7113-4842-a9fd-2dac4effbd5f', 'Caneca Criativa', 'Caderno com capa dura e design personalizvel.', '29.99', 'https://i.imgur.com/YfJQV5z.png?id=139', '3b54dd26-da0c-417a-b520-6b829da5d83e');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('a4ed1064-4045-471d-8409-b1f1e991c608', 'Caderno Customizado', 'Almofada macia com impresso de alta qualidade.', '25.00', 'https://i.imgur.com/YfJQV5z.png?id=144', 'b2f0b3c6-8d5c-4bee-bc51-a4e7a06222a9');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('1710b265-14c4-4431-ba81-8dc4cb62a8ad', 'Poster Artstico', 'Caneca de cermica com design exclusivo.', '25.00', 'https://i.imgur.com/YfJQV5z.png?id=149', '43946414-8a50-41ca-aa72-b09b5fab6a6d');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('1f20484f-97a5-437a-abec-8976de70cb2b', 'Caderno Customizado', 'Camiseta 100 algodo com estampas personalizadas.', '18.90', 'https://i.imgur.com/YfJQV5z.png?id=154', '19745db9-dcfa-428b-a509-61ec1834e47e');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('a8bfff45-1cbb-48cf-95e5-85e660009f38', 'Caderno Customizado', 'Poster em papel fotogrfico com arte nica.', '15.50', 'https://i.imgur.com/YfJQV5z.png?id=159', 'e583d086-a669-43aa-9d83-fab97bad36b0');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('5c6beda8-2a21-448c-9722-8c809365ded4', 'Caneca Criativa', 'Caderno com capa dura e design personalizvel.', '29.99', 'https://i.imgur.com/YfJQV5z.png?id=164', '3b54dd26-da0c-417a-b520-6b829da5d83e');
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "categoryId") VALUES ('4e5f8269-af15-4ceb-bd2e-a07cb2f6eb63', 'Poster Artstico', 'Almofada macia com impresso de alta qualidade.', '29.99', 'https://i.imgur.com/YfJQV5z.png?id=169', 'e583d086-a669-43aa-9d83-fab97bad36b0');

INSERT INTO "Cart" ("id", "userId") VALUES ('a212270d-a653-4f04-9505-ead212d272e1', 'f4813c36-264d-4e57-854e-a8c0a8f6cde1');
INSERT INTO "Cart" ("id", "userId") VALUES ('a7e75b5e-c653-4afa-9a05-0d4dd274416e', 'a243ae29-7c29-4e99-85c3-f98774819ecf');
INSERT INTO "Cart" ("id", "userId") VALUES ('706128ac-abc5-43dc-a37f-dddf0a26d369', 'ca3626e1-b81b-476b-88bf-e56faf60e3b7');
INSERT INTO "Cart" ("id", "userId") VALUES ('4b502270-c231-46e9-ac1a-daceb6039ae4', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Cart" ("id", "userId") VALUES ('a136a792-f3f5-4e3f-bad5-74703329fc54', '5326681b-a8eb-4fa6-8650-13960d81dc5c');
INSERT INTO "Cart" ("id", "userId") VALUES ('128c1c4e-4809-43bc-aaa8-4473093c0b5e', '89c10969-1533-4ed8-9295-af632a81c18b');
INSERT INTO "Cart" ("id", "userId") VALUES ('e6a6e370-c0ce-49a5-8e56-e262a7fa8666', '5928c395-7d22-467e-93f7-f31034d3384f');
INSERT INTO "Cart" ("id", "userId") VALUES ('32e7daf6-7f5a-4cd9-bf3b-80f20bee31ac', 'abcb4206-3207-494f-a15e-3fdda0f7f474');
INSERT INTO "Cart" ("id", "userId") VALUES ('5aa29a52-b0de-4f13-be01-81a127cb86b7', '89c10969-1533-4ed8-9295-af632a81c18b');
INSERT INTO "Cart" ("id", "userId") VALUES ('fe0b074c-2272-4d29-ad28-aaaf5ac834b8', '5326681b-a8eb-4fa6-8650-13960d81dc5c');

INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('97ea2b56-0c68-4641-b931-f425958ff9a0', 'Enviado', 'R 4550', '183 430 Lafayette St, New York, NY 10003', 'PayPal', 'abcb4206-3207-494f-a15e-3fdda0f7f474');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('80fcf44e-6a71-4ac1-8904-605b8049c821', 'Pendente', 'R 12075', '188 91 Christopher St, New York, NY 10014', 'Pix', '89c10969-1533-4ed8-9295-af632a81c18b');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('f3ba81e8-05c2-488c-8532-d19b0f1355ef', 'Entregue', 'R 12075', '193 91 Christopher St, New York, NY 10014', 'Pix', 'a243ae29-7c29-4e99-85c3-f98774819ecf');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('8d57473e-66dd-47c1-a1b7-48373ad1525a', 'Cancelado', 'R 12075', '198 430 Lafayette St, New York, NY 10003', 'PayPal', '5326681b-a8eb-4fa6-8650-13960d81dc5c');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('7c8b024d-b48c-4ffd-898c-86cad0b47367', 'Cancelado', 'R 8990', '203 136 E 13th St, New York, NY 10003', 'Carto de Dbito  Mastercard', 'f4813c36-264d-4e57-854e-a8c0a8f6cde1');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('64ede138-7ecd-4df4-aa47-e9a0d53c915c', 'Cancelado', 'R 8990', '208 18 W 29th St, New York, NY 10001', 'Carto de Dbito  Mastercard', 'f4813c36-264d-4e57-854e-a8c0a8f6cde1');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('fba447b2-3b62-471c-aaff-9affd1ce2326', 'Cancelado', 'R 8990', '213 330 W Broadway, New York, NY 10013', 'Boleto Bancrio', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('e6572950-0887-4620-809f-cf87d9262092', 'Cancelado', 'R 8990', '218 91 Christopher St, New York, NY 10014', 'Carto de Crdito  Visa', 'abcb4206-3207-494f-a15e-3fdda0f7f474');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('d9957e46-0b17-4ef9-bf85-e1950545ce7c', 'Enviado', 'R 12075', '223 91 Christopher St, New York, NY 10014', 'PayPal', 'f4813c36-264d-4e57-854e-a8c0a8f6cde1');
INSERT INTO "Order" ("id", "status", "totalAmount", "shippingAddress", "paymentInfo", "userId") VALUES ('9c9607a1-f41f-42dd-b4fc-57495b51aea7', 'Entregue', 'R 15000', '228 443 E 6th St, New York, NY 10009', 'Pix', '5326681b-a8eb-4fa6-8650-13960d81dc5c');

INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('74666e73-9fbb-47bd-8d25-12d765b2aef3', 'Lucas Oliveira', '232Bernadine42@hotmail.com', 'Como posso rastrear meu pedido', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('bd9936de-b2b8-427c-b2b3-7307cfbef1a4', 'Lucas Oliveira', '236Tyree_Bartell32@gmail.com', 'Preciso de ajuda para acessar minha conta.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('964555bf-2b82-4eca-a050-44a0ee8f3a88', 'Joo Santos', '240Jeramy.Hermiston@gmail.com', 'Gostaria de saber mais sobre as opes de personalizao.', 'ca3626e1-b81b-476b-88bf-e56faf60e3b7');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('ff3f27a1-9d3a-47a7-a3aa-826d81759515', 'Lucas Oliveira', '244Eliane30@gmail.com', 'Preciso de ajuda para acessar minha conta.', 'a243ae29-7c29-4e99-85c3-f98774819ecf');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('e494a780-5c7c-44b5-85e7-e79f786a0286', 'Joo Santos', '248Bo72@gmail.com', 'O produto que encomendei chegou com defeito.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('c76a9847-fe4c-44d0-9d49-3d6375c1b5f6', 'Carlos Silva', '252Emiliano_Langosh@yahoo.com', 'O produto que encomendei chegou com defeito.', 'f4813c36-264d-4e57-854e-a8c0a8f6cde1');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('ea36f198-9d3c-4cbe-bf52-0a294d70d32a', 'Joo Santos', '256Levi_Hansen34@yahoo.com', 'O produto que encomendei chegou com defeito.', '89c10969-1533-4ed8-9295-af632a81c18b');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('eb9c5a7c-5cb1-401b-8c66-f581f24c1051', 'Lucas Oliveira', '260Horace.Monahan8@yahoo.com', 'Gostaria de saber mais sobre as opes de personalizao.', 'ca3626e1-b81b-476b-88bf-e56faf60e3b7');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('8779d093-ed08-4cba-8061-ba0f56725189', 'Lucas Oliveira', '264Adrian.Lesch43@hotmail.com', 'Como posso rastrear meu pedido', 'ca3626e1-b81b-476b-88bf-e56faf60e3b7');
INSERT INTO "SupportMessage" ("id", "name", "email", "message", "userId") VALUES ('7b37a198-1dd4-44f8-b46e-672793fb379f', 'Joo Santos', '268Reyna.Stiedemann@yahoo.com', 'Gostaria de saber mais sobre as opes de personalizao.', 'abcb4206-3207-494f-a15e-3fdda0f7f474');

INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('3c995a58-4625-4521-8d76-bdd950769e6f', 557, 'Imagem logo_empresa.png Texto Equipe Cor Branco', '32e7daf6-7f5a-4cd9-bf3b-80f20bee31ac', '47083e62-6fea-40cb-8497-b4edb2e3cb4f');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('54917c2d-dceb-4bb4-a3ed-a9e7bb404945', 611, 'Texto Melhor Pai Cor Verde', '32e7daf6-7f5a-4cd9-bf3b-80f20bee31ac', '47083e62-6fea-40cb-8497-b4edb2e3cb4f');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('8ea66b3f-547f-421c-b34b-6b78a881a2e7', 135, 'Texto Parabns Cor Amarelo', 'e6a6e370-c0ce-49a5-8e56-e262a7fa8666', '4e5f8269-af15-4ceb-bd2e-a07cb2f6eb63');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('147a8494-3ba1-41b0-a766-65749bbf8352', 649, 'Texto Feliz Aniversrio Cor Azul', '4b502270-c231-46e9-ac1a-daceb6039ae4', 'be802c50-c7c2-4c04-a2b6-cdf04d21cca1');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('145a2f8e-89bf-4a6d-8382-42b952139538', 303, 'Texto Feliz Aniversrio Cor Azul', '706128ac-abc5-43dc-a37f-dddf0a26d369', '5c6beda8-2a21-448c-9722-8c809365ded4');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('497fb345-7831-4f9f-8b80-3d9e222f13ba', 635, 'Imagem logo_empresa.png Texto Equipe Cor Branco', '5aa29a52-b0de-4f13-be01-81a127cb86b7', 'be802c50-c7c2-4c04-a2b6-cdf04d21cca1');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('632f3fbd-a83c-4fbb-b2c9-b286423521d3', 671, 'Imagem foto_familia.jpg Texto Amor Cor Vermelho', 'a136a792-f3f5-4e3f-bad5-74703329fc54', 'a4ed1064-4045-471d-8409-b1f1e991c608');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('f7685c7b-425c-4cae-bfa1-bf72c7febdb5', 386, 'Texto Parabns Cor Amarelo', '32e7daf6-7f5a-4cd9-bf3b-80f20bee31ac', 'f8782228-7113-4842-a9fd-2dac4effbd5f');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('36b8bac2-aa45-40cd-a3c6-3b763765a0cc', 876, 'Texto Feliz Aniversrio Cor Azul', 'fe0b074c-2272-4d29-ad28-aaaf5ac834b8', 'be802c50-c7c2-4c04-a2b6-cdf04d21cca1');
INSERT INTO "CartItem" ("id", "quantity", "customizationData", "cartId", "productId") VALUES ('c245fe5a-de02-4408-96eb-6aef0abb8139', 977, 'Texto Feliz Aniversrio Cor Azul', 'a7e75b5e-c653-4afa-9a05-0d4dd274416e', 'be802c50-c7c2-4c04-a2b6-cdf04d21cca1');

INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('35229a64-0f39-482d-bae2-11263410c030', 704, '19.99', 'Image logo.png', 'f3ba81e8-05c2-488c-8532-d19b0f1355ef', 'a4ed1064-4045-471d-8409-b1f1e991c608');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('df45642a-d698-4e33-a5dc-33e8145ee35e', 245, '19.99', 'Text Happy Birthday', '64ede138-7ecd-4df4-aa47-e9a0d53c915c', '47083e62-6fea-40cb-8497-b4edb2e3cb4f');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('e380fc23-6a44-4876-9ae6-00343d11d368', 857, '15.50', 'Color Red', 'e6572950-0887-4620-809f-cf87d9262092', 'f8782228-7113-4842-a9fd-2dac4effbd5f');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('ac8cceb5-7146-4c91-bc2e-0ea1298e68d8', 87, '25.00', 'Color Red', 'd9957e46-0b17-4ef9-bf85-e1950545ce7c', '1710b265-14c4-4431-ba81-8dc4cb62a8ad');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('b610cf7f-2f18-408f-b0bf-f2993bf89744', 113, '19.99', 'Text Happy Birthday', '80fcf44e-6a71-4ac1-8904-605b8049c821', '47083e62-6fea-40cb-8497-b4edb2e3cb4f');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('6e8d7691-d16e-48e7-841d-bbe3594fe469', 802, '25.00', 'Image logo.png', '8d57473e-66dd-47c1-a1b7-48373ad1525a', 'a8bfff45-1cbb-48cf-95e5-85e660009f38');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('7f21d71d-a5c1-457c-a9b8-b7f21c78b1f5', 683, '29.95', 'Text Best Dad Ever', '64ede138-7ecd-4df4-aa47-e9a0d53c915c', 'a4ed1064-4045-471d-8409-b1f1e991c608');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('1a87207e-279e-40cc-9623-d919aba06c48', 430, '19.99', 'Image logo.png', '8d57473e-66dd-47c1-a1b7-48373ad1525a', '5c6beda8-2a21-448c-9722-8c809365ded4');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('2c55b5a2-0193-4062-9dbf-afe5c3c38879', 250, '25.00', 'Image custom_design.jpg', 'd9957e46-0b17-4ef9-bf85-e1950545ce7c', 'a4ed1064-4045-471d-8409-b1f1e991c608');
INSERT INTO "OrderItem" ("id", "quantity", "price", "customizationData", "orderId", "productId") VALUES ('cbd49f14-11bd-47d7-8f68-f5768d2d5d48', 335, '15.50', 'Color Red', '97ea2b56-0c68-4641-b931-f425958ff9a0', '6b602ca1-8941-437b-9025-e5ab263b8981');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
