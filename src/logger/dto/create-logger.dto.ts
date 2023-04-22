
export class CreateLoggerDto {
  level: string;
  message: string;
  meta: Record<string, any>;
}