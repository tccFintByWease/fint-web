export default function Movimentacao(idUsuario, idCategoria, idDetalheMovimentacao, idTipoMovimentacao, valorMovimentacao, observacaoMovimentacao, dataMovimentacao) {
    this.idUsuario = idUsuario;
    this.idCategoria = idCategoria;
    this.idDetalheMovimentacao = idDetalheMovimentacao;
    this.idTipoMovimentacao = idTipoMovimentacao;
    this.valorMovimentacao = valorMovimentacao;
    this.observacaoMovimentacao = observacaoMovimentacao;
    this.dataMovimentacao = dataMovimentacao;
}