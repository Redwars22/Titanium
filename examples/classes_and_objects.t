CLASS Person:
    name: STR
    age: INT
    height: REAL
    weight: REAL

    CONST = {name}:
        THIS.name = name
    END

    ageUp():
        THIS.age += 1
    END
END

DEF person1: Person("Andrew")
DEF person2: Person("Varian")
