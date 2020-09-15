class DuplicateCheck(object):
    def __init__(self, data_id, check_type):
        self.data_id = data_id
        self.duplicate_columns = DuplicateColumns()


class DuplicateColumns(object):
    def check(self, df):
        duplicate_columns = set()
        for x in range(df.shape[1]):
            col = df.iloc[:, x]
            for y in range(x + 1, df.shape[1]):
                otherCol = df.iloc[:, y]
                if col.equals(otherCol):
                    duplicate_columns.add(df.columns.values[y])

        return list(duplicate_columns)


class DuplicateColumnNames(object):
    def check(self, df):
        distinct_names = {}
        for col in df.columns:
            general_name = col.strip().lower()
            names = distinct_names.get(general_name, [])
            names.append(col)
            distinct_names[general_name] = names
        return {k: v for k, v in distinct_names.items() if len(v) > 1}
