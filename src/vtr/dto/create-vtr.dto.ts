import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { Type, Transform } from 'class-transformer';

export class CreateVtrDto {

  @IsDate({ message: 'O campo deve ser do tipo data data_regsitro' })
  @ApiProperty()
  @Type(() => Date)
  data_regsitro: Date

  @IsNumber({}, { message: 'O campo de conter numero. O viatura deve ser associada a algum estado' })
  @ApiProperty()
  situacao_id: number

  @IsString({ message: 'A viatura de ser associada a algum processo' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  processo_vinculacao: string

  @IsNumber({}, { message: 'O campo de conter numero. O viatura deve ser associada a alguma unidade' })
  @ApiProperty()
  orgao_id: number

  @IsString({ message: 'A viatura de ser associada a algum departamento da unidade selecionada' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  departamento: string

  @IsString({ message: 'A viatura de ser associada a algum servidor requerente' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  nome: string

  @IsString({ message: 'A viatura de ser associada ao cpf do servidor requerente' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  cpf: string

  @IsString({ message: 'A viatura de ser associada a alguma montadora marca' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  marca: string

  @IsString({ message: 'A viatura de ser associada a algum modelo' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  modelo: string

  @IsString({ message: 'A viatura de ser associada a alguma cor' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  cor: string

  @IsNumber({}, { message: 'A viatura de ser associada a algum ano de fabricação' })
  @ApiProperty()
  ano: number

  @IsString({ message: 'A viatura de ser associada a algum chassi' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  chassi: string

  @IsString({ message: 'A viatura de ser associada a algum renavam' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  renavam: string

  @IsString({ message: 'A placa oficial da viatura de ser informada' })
  @ApiProperty()
  @Transform(({ value }) => value.toUpperCase())
  placa_oficial: string

  @IsBoolean({ message: 'dDeve informar se a viatura e alugada ou não' })
  @ApiProperty()
  locado: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'O campo deve ser do tipo data data_fim_locacao' })
  @ValidateIf((value) => value !== null)
  data_fim_locacao: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  placa_atribuida: string

  @IsDate({ message: 'O campo deve ser do tipo data data_atribuicao' })
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ required: false })
  data_atribuicao: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  doerj_atribuicao: string

  @IsDate({ message: 'O campo deve ser do tipo data data_validade' })
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ required: false })
  data_validade: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  processo_revalidacao: string

  @IsDate({ message: 'O campo deve ser do tipo data data_expiracao' })
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ required: false })
  data_expiracao: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  doerj_revalidacao: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  processo_desvinculacao: string

  @IsDate({ message: 'O campo deve ser do tipo data data_desvinculacao' })
  @IsOptional()
  @ApiProperty()
  @Type(() => Date)
  data_desvinculacao: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  doerj_desvinculacao: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toUpperCase())
  observacao: string

  createdBy: string;

  updatedBy: string;

}
