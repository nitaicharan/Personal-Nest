import { Transform } from 'class-transformer';

export function RemoveNullCharacters() {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\u0000/g, '') : value,
  );
}
