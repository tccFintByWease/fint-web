import React, { Fragment } from 'react';
import Footer from './../../components/Footer/index.js';
import './styles.css';
import './mediaQueries.css';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/images/black-logo.png';

function Documentation() {
    return (
        <Fragment>
            <header className="documentation-header flex">
                <a href="#">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
            </header>
            <section className="documentation">
                <div className="terms-of-use">
                    <h1>Termos de Uso</h1>
                    <p className="last-update">Última atualização - 17/08/2022</p>
                    <div className="alert alert-warning flex">
                        <FontAwesomeIcon icon={faWarning} />
                        <p>
                            é sugerida a leitura integral e atenta deste documento de termos de uso da fint, visto que possui a relação básica de direitos e deveres existentes entre empresa e usuário. caso discorde de algum ponto presente neste escrito, informe que não aceita o conteúdo nele presente no ato de seu cadastro.
                        </p>
                    </div>
                    <h2>DEFINIÇÕES</h2>
                    <ul>
                        <li>
                            <strong>Pessoa jurídica:</strong> uma empresa, uma firma, uma pessoa que não seja física.
                        </li>
                        <li>
                            <strong>Solução:</strong> nesse contexto, refere-se a aplicativos, sites, páginas, sistemas que de um modo geral resolvem as problemáticas encontradas.
                        </li>
                        <li>
                            <strong>Banco de dados:</strong> estrutura responsável por armazenar de forma organizada os dados obtidos durante o uso de uma determinada aplicação.
                        </li>
                        <li>
                            <strong>Receita:</strong> quantia adicionada aos fundos de uma pessoa, em sua conta.
                        </li>
                        <li>
                            <strong>Despesa:</strong> quantia subtraída da conta de uma pessoa.
                        </li>
                        <li>
                            <strong>Investimento:</strong> porção de dinheiro empregada em uma atividade com o intuito de que seja retribuída uma quantia superior.
                        </li>
                    </ul>
                    <h2>DESCRIÇÃO DA EMPRESA</h2>
                    <p>Wease co. é uma empresa fictícia criada no ano de 2022 por alunos de Desenvolvimento de Sistemas (DS) integrado ao Ensino Médio da Escola Técnica Estadual de São Paulo (ETESP), sendo eles: André Borges Silva, Arthur Mariano Percinoto, Breno Cerqueira Araújo, Felippe Rodrigues de Oliveira e Luiz Carlos Costa Gandra Filho. A criação desta está atrelada a produção do Trabalho de Conclusão de Curso do grupo formado pelos estudantes citados. Contudo, não se trata de uma pessoa jurídica real, não havendo, assim, um CNPJ nem um nome completo da instituição a ser apresentado. Porém, estima-se que a iniciativa ganhe vida, permitindo que esses dados sejam listados neste documento a partir do ano de 2023.</p>
                    <p>Após situar cronologicamente e no espaço o projeto, vale uma descrição sobre ele. Visando atingir a completa formação na ETEC, o corpo discente deve produzir um complexo trabalho que se relaciona com o respectivo curso técnico. Quanto aos estudantes de DS orienta-se o desenvolvimento de uma solução digital para situações reais: é necessária a criação de aplicações web e mobile, além da documentação relacionada a banco de dados e demais temas cabíveis. Entretanto, tecnologias não surgem espontaneamente, mas sim são feitas por pessoas, através de empresas – e é nesse contexto que nasce a Wease co., idealizadora da Fint.</p>
                    <p>Wease foi o nome cunhado pelos integrantes do grupo para simbolizar a união deles, sob a forma de uma firma. O termo, porém, é completamente adequado: deriva da frase em inglês “We ease”, cuja tradução trata-se de “Nós facilitamos”. De tal modo, passa a ficar clara a função dessa empresa: dar praticidade e tranquilidade para que os usuários sejam capazes de administrar suas tarefas corriqueiras. A maneira encontrada para o atingimento desse objetivo é justamente na criação de aplicações direcionadas a solucionar problemas de várias origens, oriundos da vida da população. Atualmente, a única realização dessa instituição foi uma plataforma voltada para as finanças, Fint – Financial Technology.</p>
                    <p>Passando para a Língua Portuguesa, fica claro que se trata de uma tecnologia voltada para as questões econômicas. O território financeiro pode parecer minado, ou seja, perigoso para muitas pessoas, pelo fato de receberem baixas remunerações ou temerem dívidas, por exemplo. O intuito da Fint é fornecer uma melhor gestão de receitas, despesas e investimentos ao cidadão comum. Além disso, busca-se também ensinar sobre o tema de maneira leve e clara, através de aulas, textos e vídeos. Os objetivos da aplicação estão listados mais amplamente na próxima seção.</p>
                    <h2>OBJETIVOS</h2>
                    <p>Com a intenção de salientar e direcionar a proposta da solução Fint é válida a listagem dos objetivos dela. Logo, abaixo se encontram os itens relativos ao assunto:</p>
                    <ol>
                        <li>Gerir de forma eficiente as despesas do usuário;</li>
                        <li>Controlar eficazmente as receitas do indivíduo;</li>
                        <li>Fornecer uma visualização gráfica esclarecedora ao dono da conta;</li>
                        <li>Informar, quando necessário, atitudes cabíveis para uma melhora da saúde financeira em questão;</li>
                        <li>Auxiliar no registro e na análise de investimento;</li>
                        <li>Facilitar a leitura de informações dentro dessa área;</li>
                        <li>Propiciar um conteúdo responsável e competente que visa munir intelectualmente o usuário no tema;</li>
                        <li>Intensificar e melhorar as movimentações monetárias da população, levando a uma consciente ascensão social;</li>
                        <li>Diminuir as desigualdades sociais ao fomentar a independência financeira de um grupo desprezado socialmente, a classe baixa;</li>
                        <li>Elevar, por consequência da estabilidade econômica gerada, a qualidade de vida e o acesso a lazer, serviços básicos e cultura do povo brasileiro.</li>
                    </ol>
                    <h2>ASSINATURAS</h2>
                    <p>Como observado resumidamente em uma página da aplicação web da Fint, há apenas um plano de assinatura disponível. Logo, de forma simples, o usuário se adequa a uma de duas categorias: pagante ou não pagante. Visando esclarecer as vantagens do Premium, segue a lista com as funcionalidades exclusivas do grupo:</p>
                    <ol>
                        <li>Compartilhar / exportar gráficos (PDF, PNG);</li>
                        <li>Opções a mais de gráficos na tela inicial;</li>
                        <li>Livre de Anúncios;</li>
                        <li>Diferentes gráficos para o mesmo conteúdo;</li>
                        <li>Suporte prioritário;</li>
                        <li>Trilhas exclusivas (intermediária e avançada);</li>
                        <li>Gestão de despesas;</li>
                        <li>Newsletter (envio por email das principais manchetes sobre o mundo financeiro, semanalmente).</li>
                    </ol>
                    <p>Por mais que haja apenas uma única opção de assinatura em toda a plataforma, existem diferentes tipos de compras, referentes aos períodos de assinatura, sendo eles: mensal, trimestral e anual. O valor de um mês é de R$19,99, porém quanto maior a duração do plano maior será o desconto aplicado durante a aquisição do mesmo. Nos casos de três e doze meses haverá, respectivamente, uma diminuição de 10% e 17% (valores aproximados, sujeitos a alteração).</p>
                    <p>O pagamento será feito via pix, cartão ou boleto, ficando a critério do usuário a escolha do método. Vale salientar que pode haver distinções entre o preço apresentado e o total a ser pago, em virtude de possíveis taxas a serem agregadas pelas operadoras das transações.</p>
                    <p>O usuário possui integral liberdade para decidir se deseja, no decorrer da validade de seu plano, encerrar o mesmo. A cobrança é efetuada mensalmente e, caso o mês vigente já tenha sido debitado e seja feito o cancelamento, o dinheiro NÃO será devolvido. Portanto, é recomendável o encerramento do contrato antes da data de cobrança automática.</p>
                    <h2>MODIFICAÇÕES</h2>
                    <p>A Fint, vista a previsão presente neste documento, se reserva o direito de alterar os Termos de Uso da aplicação sem qualquer aviso prévio. Logo, em eventuais reclamações vindas dos usuários será considerado o documento vigente na data do ocorrido, podendo não ser o mesmo do ato do chamado.</p>
                    <p>Quaisquer atualizações dos Termos de Uso da Fint pela Wease co. serão notificadas a todos os usuários, a fim de evitar confusões.</p>
                    <p>Ao ingressar na plataforma, o usuário deve estar ciente dos Termos de Uso vigentes, disponíveis no ato do cadastro e cuja aceitação é obrigatória para o ingresso no sistema.</p>
                    <h2>DIREITOS AUTORAIS</h2>
                    <p>Todo o material apresentado nas aplicações web e mobile da Fint, sendo ele: textos, imagens, vídeos, código, produções visuais, entre outros, são de autoria exclusiva da Wease co.</p>
                    <p>O uso deste para fins comerciais sem prévio acordo com a equipe da Wease co. será tratado juridicamente.</p>
                    <h2>DISPOSIÇÕES GERAIS</h2>
                    <p>Estes Termos de Uso referem-se única e exclusivamente a Fint, não tendo utilidade para quaisquer outras plataformas da Wease co. </p>
                    <p>A fim de esclarecer as relações, responsabilidades e limites entre plataforma e usuário é escrito este documento.</p>
                    <h2>LEI E FORO APLICÁVEIS</h2>
                    <p>Estes Termos de Uso serão interpretados exclusivamente sob a legislação brasileira.</p>
                    <p>Este documento foi atualizado pela última vez no dia 17 de agosto de 2022, pela equipe da Wease co.</p>
                </div>
                <div className="privacy-policy">
                    <h1>Política de Privacidade</h1>
                    <p className="last-update">Última atualização - 28/08/2022</p>
                    <div className="alert alert-warning flex">
                        <FontAwesomeIcon icon={faWarning} />
                        <p>
                            este documento define a política de privacidade válida para o site fint e o aplicativo móvel homônimo. ao se cadastrar em nossa plataforma, o usuário confirma estar de acordo com as informações definidas a seguir e nos termos de uso. destaca-se também que ambos os documentos estão sujeitos a mudanças sem aviso prévio, porém que serão avisados.
                        </p>
                    </div>
                    <h2>DEFINIÇÕES</h2>
                    <p>Os termos listados abaixo serão usados de forma recorrente durante o decorrer do arquivo. Assim, visando tornar a leitura clara e compreensível, estabelecemos os respectivos significados a seguir.</p>
                    <ul>
                        <li>
                            <strong>Plataforma, site e aplicativo:</strong> a plataforma Fint é o ambiente integrado formado pelo site (fint.com.br) e pelo aplicativo móvel disponível para Android e iOS;
                        </li>
                        <li>
                            <strong>Dados pessoais:</strong> informações que identificam o usuário, como nome, telefone, endereço e outros dados solicitados durante o cadastro dele na plataforma;
                        </li>
                        <li>
                            <strong>Usuário:</strong> pessoa física maior de 16 anos cadastrada em nossa plataforma.
                        </li>
                    </ul>
                    <h2>ALTERAÇÕES DA POLÍTICA DE PRIVACIDADE</h2>
                    <p>É fundamental a revisão deste documento como forma de garantir uma base sólida e segura para o usuário da plataforma. Portanto, a Política de Privacidade está sujeita a mudanças, as quais entrarão em vigor logo após serem notificadas. Caso o indivíduo continue a utilizar sua conta, estará de acordo com as mudanças na política.</p>
                    <h2>DADOS COLETADOS</h2>
                    <p>Ao se cadastrar na plataforma, o usuário insere seus dados pessoais voluntariamente para que seja possível utilizar de seus recursos por meio de uma conta. Nome, e-mail, telefone, CPF, e outros dados exigidos no formulário de cadastro estão incluídos nessa categoria.</p>
                    <p>Os dados coletados pela plataforma por meio dos Cookies (explicados futuramente no documento), por sua vez, são necessários para garantir a melhor experiência possível para o usuário.</p>
                    <h2>USO DOS DADOS</h2>
                    <p>A Fint se responsabiliza pela segurança dos dados de seus usuários. Dessa forma, a utilização dessas informações é transparecida por meio da lista abaixo.</p>
                    <ol>
                        <li>
                            <strong>Garantir o funcionamento adequado e otimizado da plataforma:</strong> os dados de acesso do usuário podem ser usados para analisar e desenvolver a experiência do usuário, no aplicativo e no site;
                        </li>
                        <li>
                            <strong>Criação de relatórios:</strong> dados pessoais podem ser utilizados para análise dos usuários da plataforma de forma genérica, visando a criação de relatórios que apresentem informações importantes para traçar os perfis de usuário de nosso serviço. Esses relatórios podem ser usados para a criação de novos recursos que atendam às necessidades dos usuários, criar promoções, desenvolver estudos e mais;
                        </li>
                        <li>
                            <strong>Comunicação por e-mail ou notificações:</strong> o usuário poderá receber e-mails promocionais (caso marque essa opção no formulário de cadastro ou mais tarde nas configurações da conta) em seu e-mail fornecido durante a criação da conta, assim como notificações em seu dispositivo móvel, que podem ser desativadas há qualquer momento nas configurações do aplicativo.
                        </li>
                    </ol>
                    <h2>ARMAZENAMENTO E EXCLUSÃO DE DADOS</h2>
                    <p>Os dados do usuário são armazenados e mantidos em nossa base de dados enquanto sua conta permanecer ativa. Caso ocorra a solicitação de exclusão da conta por meio das configurações no site ou aplicativo, todos os dados pessoais do usuário serão excluídos da nossa plataforma após um período de 1 semana, dentro do qual será possível reativar a conta.</p>
                    <h2>COOKIES</h2>
                    <p>Cookies são pequenos arquivos armazenados no computador do usuário pelo navegador para otimizar a sua experiência em nossa plataforma. Além disso, os anúncios são exibidos em nossa plataforma por meio do programa Google AdSense, que também coleta Cookies. Dessa forma, <strong>nenhum dado pessoal pode ser coletado pelos Cookies</strong>, visto que não são necessários para essa finalidade.</p>
                    <p>Existem dois tipos de Cookies, salvo e temporário. O Cookie salvo é aquele armazenado no dispositivo do usuário, de forma a manter suas informações salvas, como por exemplo seu login e sua senha, mantendo sua conta salva no navegador. O Cookie temporário, por sua vez, serve para armazenar dados durante a navegação na plataforma e é removido do dispositivo do usuário assim que o navegador é fechado.</p>
                    <p>Caso deseje, o usuário pode desabilitar o uso dos Cookies em seu navegador. <strong>Essa decisão não é recomendada pela Fint</strong>, já que pode afetar os recursos de nossa plataforma, que não funcionará da forma planejada.</p>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Documentation;