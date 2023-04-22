import { ApiProperty } from "@nestjs/swagger"

export class Vtr {

  @ApiProperty()
  id: number

  @ApiProperty()
  data_regsitro: Date

  @ApiProperty()
  situacao_id: number

  @ApiProperty()
  processo_vinculacao: string

  @ApiProperty()
  orgao_id: number

  @ApiProperty()
  departamento: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  cpf: string

  @ApiProperty()
  marca: string

  @ApiProperty()
  modelo: string

  @ApiProperty()
  cor: string

  @ApiProperty()
  ano: number

  @ApiProperty()
  chassi: string

  @ApiProperty()
  renavam: string

  @ApiProperty()
  placa_oficial: string

  @ApiProperty()
  locado: boolean

  @ApiProperty()
  data_fim_locacao: Date

  @ApiProperty()
  placa_atribuida: string

  @ApiProperty()
  data_atribuicao: Date

  @ApiProperty()
  doerj_atribuicao: string

  @ApiProperty()
  data_validade: Date

  @ApiProperty()
  processo_revalidacao: string

  @ApiProperty()
  data_expiracao: Date

  @ApiProperty()
  doerj_revalidacao: string

  @ApiProperty()
  processo_desvinculacao: string

  @ApiProperty()
  data_desvinculacao: Date

  @ApiProperty()
  doerj_desvinculacao: string

  @ApiProperty()
  observacao: string

}
